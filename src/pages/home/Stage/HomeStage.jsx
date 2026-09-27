import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero from "../Hero/Hero";
import ProjectList from "../Projects/ProjectList";
import useStories from "../Projects/useStories";
import { KEY_ORIGIN, PORTRAIT, SCREEN, WAIKI_SCREEN } from "./screenGeometry";

// Scroll lengths in vh: the photo pushes in, then the list rises while the
// screen travels into the first project image.
const PUSH = 60;
const MORPH = 100;
// Screen height at the end of the push, as a share of the viewport.
const SCREEN_FILL = 0.5;

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const lerp = (from, to, t) => from + (to - from) * t;
const span = (t, from, to) => clamp01((t - from) / (to - from));
// Zero velocity at both ends, so consecutive phases join without a kink.
const smooth = (t) => t * t * (3 - 2 * t);

// Offsets ignore transforms, so entrance and scroll motion never skew the fit.
function offsetWithin(el, root) {
  let left = 0;
  let top = 0;
  for (let node = el; node && node !== root; node = node.offsetParent) {
    left += node.offsetLeft;
    top += node.offsetTop;
  }
  return { left, top, width: el.offsetWidth, height: el.offsetHeight };
}

function measure({ viewport, figure, list, slot }) {
  const vw = viewport.offsetWidth;
  const vh = viewport.offsetHeight;
  const f = offsetWithin(figure, viewport);
  const k = f.width / PORTRAIT.width;
  const w = SCREEN.width * k;
  const h = SCREEN.height * k;
  const cx = f.left + SCREEN.cx * k;
  const cy = f.top + SCREEN.cy * k;
  return {
    vw,
    vh,
    push: (SCREEN_FILL * vh) / h,
    tx: vw / 2 - cx,
    ty: vh / 2 - cy,
    w,
    h,
    radius: SCREEN.radius * k,
    pushEnd: (PUSH / 100) * vh,
    distance: ((PUSH + MORPH) / 100) * vh,
    slot: offsetWithin(slot, list),
  };
}

export default function HomeStage({ onSelect }) {
  const stories = useStories();
  const lead = stories[0]?.project;

  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const figureRef = useRef(null);
  const listRef = useRef(null);
  const slotRef = useRef(null);
  const appRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

  const geom = useMotionValue(null);
  const [slotBox, setSlotBox] = useState(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const update = () => {
      const parts = {
        viewport: viewportRef.current,
        figure: figureRef.current,
        list: listRef.current,
        slot: slotRef.current,
      };
      if (Object.values(parts).some((el) => !el)) return;
      const next = measure(parts);
      geom.set(next);
      setSlotBox(next.slot);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewportRef.current);
    observer.observe(figureRef.current.parentElement);
    observer.observe(listRef.current);
    document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, [geom]);

  // Decode both frame images up front so their first paint can't stall a frame.
  useEffect(() => {
    for (const img of [appRef.current, photoRef.current]) img?.decode?.().catch(() => {});
  }, [slotBox]);

  // Scroll in px past the top of the track, and the two phases as 0 to 1.
  const s = useTransform(() => scrollYProgress.get() * (geom.get()?.distance ?? 0));
  const pushT = useTransform(() => {
    const g = geom.get();
    return g ? smooth(clamp01(s.get() / g.pushEnd)) : 0;
  });
  const morphT = useTransform(() => {
    const g = geom.get();
    return g ? span(s.get(), g.pushEnd, g.distance) : 0;
  });

  useMotionValueEvent(s, "change", (x) => {
    const g = geom.get();
    if (!g) return;
    // Written to the DOM directly: a React render here costs a frame mid-scroll.
    const inert = x >= g.pushEnd / 2;
    if (textRef.current && textRef.current.inert !== inert) textRef.current.inert = inert;
  });

  // The push: the whole photo comes closer about the phone screen and levels it.
  const figureStyle = {
    x: useTransform(() => (geom.get()?.tx ?? 0) * pushT.get()),
    y: useTransform(() => (geom.get()?.ty ?? 0) * pushT.get()),
    scale: useTransform(() => lerp(1, geom.get()?.push ?? 1, pushT.get())),
    rotate: useTransform(pushT, (t) => -SCREEN.rotate * t),
    originX: SCREEN.cx / PORTRAIT.width,
    originY: SCREEN.cy / (PORTRAIT.width * 1.25),
    opacity: useTransform(morphT, [0, 0.15], [1, 0]),
    willChange: "transform",
  };
  const textStyle = { opacity: useTransform(pushT, [0, 0.5], [1, 0]) };

  // The morph: a container from the levelled screen to where the first project
  // image will sit once the list has risen under it.
  const eased = useTransform(morphT, smooth);
  const frame = {
    x: useTransform(() => {
      const g = geom.get();
      if (!g) return 0;
      return (1 - eased.get()) * (g.vw / 2 - (g.slot.left + g.slot.width / 2));
    }),
    y: useTransform(() => {
      const g = geom.get();
      if (!g) return 0;
      return (1 - eased.get()) * (g.vh / 2 - (g.slot.top + g.slot.height / 2));
    }),
    scaleX: useTransform(() => {
      const g = geom.get();
      return g ? lerp((g.w * g.push) / g.slot.width, 1, eased.get()) : 1;
    }),
    scaleY: useTransform(() => {
      const g = geom.get();
      return g ? lerp((g.h * g.push) / g.slot.height, 1, eased.get()) : 1;
    }),
  };
  // The screen's rounded corners flatten into the project image, kept circular
  // under the non-uniform scale.
  const frameRadius = useTransform(() => {
    const g = geom.get();
    if (!g) return "0px";
    const r = g.radius * g.push * (1 - eased.get());
    return `${r / frame.scaleX.get()}px / ${r / frame.scaleY.get()}px`;
  });
  const counterX = useTransform(frame.scaleX, (v) => 1 / v);
  const counterY = useTransform(frame.scaleY, (v) => 1 / v);

  // A short crossfade while the container is still small.
  const appOpacity = useTransform(morphT, [0.05, 0.3], [1, 0]);
  const photoOpacity = useTransform(morphT, [0.05, 0.3], [0, 1]);
  const appScale = useTransform(() => {
    const g = geom.get();
    if (!g) return 1;
    const startW = g.w * g.push;
    const startH = g.h * g.push;
    return Math.max(
      1,
      (frame.scaleX.get() * g.slot.width) / startW,
      (frame.scaleY.get() * g.slot.height) / startH
    );
  });

  // The frame exists only during the hand-off, the list image only after it.
  const frameVisibility = useTransform(() => {
    const g = geom.get();
    const x = s.get();
    return g && x >= g.pushEnd && x < g.distance - 0.5 ? "visible" : "hidden";
  });
  const leadVisibility = useTransform(() => {
    const g = geom.get();
    return g && s.get() >= g.distance - 0.5 ? "visible" : "hidden";
  });

  const start = geom.get();

  return (
    <div id="home" className="relative">
      <div ref={trackRef} className="relative" style={{ height: `${100 + PUSH + MORPH}vh` }}>
        <div ref={viewportRef} className="sticky top-0 z-0 h-svh overflow-hidden bg-ground">
          <Hero
            figureRef={figureRef}
            figureStyle={figureStyle}
            textStyle={textStyle}
            textRef={textRef}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-0 z-20 -mt-[100svh] h-svh"
        >
          {slotBox && start && lead && (
            <motion.div
              style={{
                ...frame,
                borderRadius: frameRadius,
                visibility: frameVisibility,
                willChange: "transform",
                left: slotBox.left,
                top: slotBox.top,
                width: slotBox.width,
                height: slotBox.height,
              }}
              className="absolute overflow-hidden bg-ink"
            >
              <motion.div
                style={{ scaleX: counterX, scaleY: counterY }}
                className="absolute inset-0"
              >
                <motion.img
                  ref={appRef}
                  src={WAIKI_SCREEN}
                  alt=""
                  style={{
                    width: start.w * start.push,
                    height: start.h * start.push,
                    x: "-50%",
                    y: "-50%",
                    scale: appScale,
                    originX: KEY_ORIGIN.x,
                    originY: KEY_ORIGIN.y,
                    opacity: appOpacity,
                  }}
                  className="absolute left-1/2 top-1/2 max-w-none object-cover"
                />
                <motion.img
                  ref={photoRef}
                  src={lead.img}
                  alt=""
                  style={{ opacity: photoOpacity }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div ref={listRef} className="relative z-10 -mt-[100svh]">
        <ProjectList onSelect={onSelect} lead={{ ref: slotRef, visibility: leadVisibility }} />
      </div>
    </div>
  );
}
