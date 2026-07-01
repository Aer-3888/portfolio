import { useEffect } from "react";

// Per-route document metadata. The static tags in index.html cover the home route for
// crawlers that do not run JS; this hook updates title/description/canonical/og as the
// SPA navigates. Tags are created if missing, otherwise reused.
const SITE_URL = "https://portfolio-theo.pages.dev";

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

export default function useSeo({ title, description, path = "/" }) {
  useEffect(() => {
    const url = SITE_URL + path;
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
    upsertLink("canonical", url);
    upsertMeta("property", "og:url", url);
  }, [title, description, path]);
}
