import { useEffect } from "react";
import { localizePath } from "../i18n/localizePath";

// Update document metadata for each route.
const SITE_URL = "https://aerworks.net";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertAlternate(hreflang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function useSeo({ title, description, path = "/", lang = "en", image }) {
  useEffect(() => {
    const canonical = SITE_URL + localizePath(path, lang);
    if (title) {
      document.title = title;
      upsertMeta("property", "og:title", title);
      upsertMeta("name", "twitter:title", title);
    }
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    upsertMeta("property", "og:locale", lang === "fr" ? "fr_FR" : "en_US");
    // Only written when a caller supplies one. Routes without their own image
    // keep inheriting the static card declared in index.html.
    if (image) {
      const absolute = image.startsWith("http") ? image : SITE_URL + image;
      upsertMeta("property", "og:image", absolute);
      upsertMeta("name", "twitter:image", absolute);
    }
    upsertLink("canonical", canonical);
    upsertMeta("property", "og:url", canonical);
    upsertAlternate("en", SITE_URL + localizePath(path, "en"));
    upsertAlternate("fr", SITE_URL + localizePath(path, "fr"));
    upsertAlternate("x-default", SITE_URL + localizePath(path, "en"));
  }, [title, description, path, lang, image]);
}
