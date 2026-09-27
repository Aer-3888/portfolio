import { useCallback, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero from "../Hero/Hero";
import useStories from "../Projects/useStories";
import useLocalizedNavigate from "../../../i18n/useLocalizedNavigate";
import useScrollToElement from "../../../hooks/useScrollToElement";
import { DURATION, EASE } from "../../../config/motion";
import { KEY_ORIGIN, PHOTO_KEY, PORTRAIT, SCREEN, WAIKI_SCREEN } from "./screenGeometry";

// Scroll lengths in vh: the lift off the phone, then one stretch per project.
const LIFT = 100;
const PANEL = 70;
const FADE = PANEL * 0.1;

// Photographs fill the frame. Screenshots sit on the ink ground.
const FILLS = new Set(["01"]);

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const lerp = (from, to, t) => from + (to - from) * t;

// Offsets ignore transforms, so the hero's entrance rise does not skew the fit.
function offsetWithin(el, root) {
  let left = 0;
  let top = 0;
  for (let node = el; node && node !== root; node = node.offsetParent) {
    left += node.offsetLeft;
    top += node.offsetTop;
  }
  return { left, top, width: el.offsetWidth, height: el.offsetHeight };
}

function measure(figure, slot, root) {
  const f = offsetWithin(figure, root);
  const s = offsetWithin(slot, root);
  const k = f.width / PORTRAIT.width;
  return {
    dx: f.left + SCREEN.cx * k - (s.left + s.width / 2),
    dy: f.top + SCREEN.cy * k - (s.top + s.height / 2),
    w: SCREEN.width * k,
    h: SCREEN.height * k,
    W: s.width,
    H: s.height,
  };
}

function StagePanel({ v, index, src, fill, keyScale }) {
  const at = LIFT + index * PANEL;
  const range = index === 0 ? [LIFT * 0.45, LIFT * 0.8] : [at - FADE, at + FADE];
  const opacity = useTransform(v, range, [0, 1]);

  // The first panel starts with its key over the app's key, then settles.
  const scale = useTransform(() => lerp(keyScale.get(), 1, opacity.get()));
  const x = useTransform(opacity, [0, 1], [`${(0.5 - PHOTO_KEY.x) * 100}%`, "0%"]);
  const y = useTransform(opacity, [0, 1], [`${(0.5 - PHOTO_KEY.y) * 100}%`, "0%"]);
  const matchCut = index === 0 ? { scale, x, y, originX: PHOTO_KEY.x, originY: PHOTO_KEY.y } : {};

  return (
    <motion.span style={{ opacity }} className="absolute inset-0 block overflow-hidden bg-ink">
      <motion.img
        src={src}
        alt=""
        decoding="async"
        style={matchCut}
        className={clsx("h-full w-full", fill ? "object-cover" : "object-contain p-8")}
      />
    </motion.span>
  );
}

function StageCaption({ v, index, count, story, project, interactive, onSelect, onFocusPanel }) {
  const { t } = useTranslation("home");
  const at = LIFT + index * PANEL;
  const next = at + PANEL;
  const fadeIn = index === 0 ? [LIFT * 0.7, LIFT * 0.95] : [at, at + FADE];
  const last = index === count - 1;
  const opacity = useTransform(
    v,
    last ? fadeIn : [...fadeIn, next - FADE, next],
    last ? [0, 1] : [0, 1, 1, 0]
  );

  return (
    <motion.article
      style={{ opacity }}
      className={clsx(
        "col-start-1 row-start-1",
        interactive ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <p className="text-sm text-ash">{project.type}</p>
      <h3 className="mt-3 font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.025em]">
        {project.title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ash">{story.note}</p>
      {story.result && <p className="mt-5 text-sm text-accent-deep">{story.result}</p>}
      <button
        type="button"
        onClick={() => onSelect(project)}
        onFocus={() => onFocusPanel(index)}
        className="mt-7 cursor-pointer border-b border-accent pb-1.5 text-sm transition-colors hover:text-accent-deep"
      >
        {t("projects.open", { title: project.title })}
      </button>
    </motion.article>
  );
}

export default function HomeStage({ onSelect }) {
  const { t } = useTranslation("home");
  const navigate = useLocalizedNavigate();
  const scrollToElement = useScrollToElement();
  const stories = useStories();
  const count = stories.length;
  const distance = LIFT + PANEL * count;

  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const figureRef = useRef(null);
  const slotRef = useRef(null);
  const markerRefs = useRef([]);

  const geom = useMotionValue(null);
  const [appSize, setAppSize] = useState(null);
  const [active, setActive] = useState(0);
  const [heroGone, setHeroGone] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const v = useTransform(scrollYProgress, (p) => p * distance);

  useLayoutEffect(() => {
    const update = () => {
      if (!figureRef.current || !slotRef.current || !stickyRef.current) return;
      const next = measure(figureRef.current, slotRef.current, stickyRef.current);
      geom.set(next);
      setAppSize({ width: next.w, height: next.h });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stickyRef.current);
    observer.observe(figureRef.current.parentElement);
    document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, [geom]);

  useMotionValueEvent(v, "change", (x) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor((x - LIFT) / PANEL))));
    setHeroGone(x > LIFT * 0.4);
  });

  const lift = useTransform(v, (x) => clamp01(x / LIFT));
  const x = useTransform(() => (geom.get()?.dx ?? 0) * (1 - lift.get()));
  const y = useTransform(() => (geom.get()?.dy ?? 0) * (1 - lift.get()));
  const rotate = useTransform(lift, (t) => SCREEN.rotate * (1 - t));
  const scaleX = useTransform(() => {
    const g = geom.get();
    return g ? lerp(g.w / g.W, 1, lift.get()) : 1;
  });
  const scaleY = useTransform(() => {
    const g = geom.get();
    return g ? lerp(g.h / g.H, 1, lift.get()) : 1;
  });
  const counterX = useTransform(scaleX, (s) => 1 / s);
  const counterY = useTransform(scaleY, (s) => 1 / s);

  // Smallest scale that keeps the app screen covering the growing window
  // while it zooms about the key.
  const appScale = useTransform(() => {
    const g = geom.get();
    if (!g) return 1;
    const winW = scaleX.get() * g.W;
    const winH = scaleY.get() * g.H;
    const shift = (0.5 - KEY_ORIGIN.y) * g.h;
    return Math.max(
      1,
      winW / g.w,
      (winH / 2 - shift) / (KEY_ORIGIN.y * g.h),
      (winH / 2 + shift) / ((1 - KEY_ORIGIN.y) * g.h)
    );
  });

  // Scale at which the photo's key matches the app key's current size.
  const keyScale = useTransform(() => {
    const g = geom.get();
    if (!g) return 1;
    return (KEY_ORIGIN.width * g.w * appScale.get()) / (PHOTO_KEY.width * g.W);
  });

  const heroOpacity = useTransform(v, [0, LIFT * 0.4], [1, 0]);
  const headOpacity = useTransform(v, [LIFT * 0.7, LIFT * 0.95], [0, 1]);

  const focusPanel = useCallback(
    (index) => {
      if (index !== active || !heroGone) scrollToElement(markerRefs.current[index]);
    },
    [active, heroGone, scrollToElement]
  );

  const current = stories[active];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative"
      style={{ height: `${distance + 100}vh` }}
    >
      {stories.map(({ story }, index) => (
        <div
          key={story.id}
          id={index === 0 ? "projects" : undefined}
          ref={(el) => {
            markerRefs.current[index] = el;
          }}
          aria-hidden="true"
          className="absolute inset-x-0 h-px"
          style={{ top: `${index === 0 ? LIFT : LIFT + index * PANEL + FADE * 2}vh` }}
        />
      ))}

      <div ref={stickyRef} className="sticky top-0 h-svh overflow-hidden bg-ground">
        <motion.div style={{ opacity: heroOpacity }} inert={heroGone}>
          <Hero figureRef={figureRef} screen={null} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 px-10">
          <div className="mx-auto grid h-full max-w-[100rem] grid-cols-12 items-center gap-6 pb-10 pt-24">
            <div className="col-span-4 flex flex-col gap-10">
              <motion.h2 style={{ opacity: headOpacity }} className="text-sm text-ash">
                {t("projects.heading")}
                <span aria-hidden="true" className="tabular-nums">
                  {t("projects.counter", { current: active + 1, total: count })}
                </span>
              </motion.h2>

              <div className="grid">
                {stories.map(({ story, project }, index) => (
                  <StageCaption
                    key={story.id}
                    v={v}
                    index={index}
                    count={count}
                    story={story}
                    project={project}
                    interactive={heroGone && index === active}
                    onSelect={onSelect}
                    onFocusPanel={focusPanel}
                  />
                ))}
              </div>

              <motion.div style={{ opacity: headOpacity }}>
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className={clsx(
                    "cursor-pointer text-sm transition-colors hover:text-accent-deep",
                    heroGone ? "pointer-events-auto" : "pointer-events-none"
                  )}
                >
                  {t("projects.cta")}
                </button>
              </motion.div>
            </div>

            <div
              ref={slotRef}
              className="relative col-span-8 col-start-5 aspect-[3/2] w-full max-w-[calc((100svh-9rem)*1.5)] justify-self-end"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.enter, delay: DURATION.enter, ease: EASE }}
                style={{ x, y, rotate }}
                className="absolute inset-0"
              >
                <motion.button
                  type="button"
                  onClick={() => onSelect(current.project)}
                  aria-label={t("projects.storyAria", { title: current.project.title })}
                  tabIndex={-1}
                  style={{ scaleX, scaleY }}
                  className="pointer-events-auto absolute inset-0 cursor-pointer overflow-hidden bg-ink"
                >
                  <motion.span
                    style={{ scaleX: counterX, scaleY: counterY }}
                    className="absolute inset-0 block"
                  >
                    {appSize && (
                      <motion.img
                        src={WAIKI_SCREEN}
                        alt=""
                        fetchPriority="high"
                        style={{
                          ...appSize,
                          x: "-50%",
                          y: "-50%",
                          scale: appScale,
                          originX: KEY_ORIGIN.x,
                          originY: KEY_ORIGIN.y,
                        }}
                        className="absolute left-1/2 top-1/2 max-w-none object-cover"
                      />
                    )}
                    {stories.map(({ story, project }, index) => (
                      <StagePanel
                        key={story.id}
                        v={v}
                        index={index}
                        src={project.img}
                        fill={FILLS.has(project.id)}
                        keyScale={keyScale}
                      />
                    ))}
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
