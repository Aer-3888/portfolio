export function getLangFromPath(pathname) {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

export function stripLang(pathname) {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3); // "/fr/x" -> "/x"
  return pathname || "/";
}

export function localizePath(path, lang) {
  const base = stripLang(path);
  if (lang === "fr") return base === "/" ? "/fr" : `/fr${base}`;
  return base;
}
