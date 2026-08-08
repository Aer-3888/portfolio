import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useScrollToElement from "../../hooks/useScrollToElement";

// A scroll aid, not a second gallery. No captions, no viewer of its own.
export default function GalleryContactSheet({ photos }) {
  const { t } = useTranslation("gallery");
  const scrollToElement = useScrollToElement();

  const jumpTo = useCallback(
    (slug) => {
      // Offset leaves room for the fixed nav above the frame.
      scrollToElement(document.getElementById(`frame-${slug}`), { offset: -80 });
    },
    [scrollToElement]
  );

  return (
    <section className="mt-40 border-t border-stone pt-10">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
          {t("sheetHeading")}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pebble">
          {photos.length}
        </span>
      </div>

      <ul className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {photos.map((photo) => (
          <li key={photo.slug}>
            <button
              type="button"
              onClick={() => jumpTo(photo.slug)}
              aria-label={t("sheetAria", { index: photo.index, place: photo.place })}
              className="group block w-full cursor-pointer text-left"
            >
              <img
                src={photo.src.thumb}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
              />
              <span aria-hidden="true" className="mt-1 block font-mono text-[9px] text-pebble">
                {String(photo.index).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
