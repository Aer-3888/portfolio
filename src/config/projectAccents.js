/*
 * One accent per project, used by the home story list, the projects grid and
 * the detail overlay. Kept desaturated so ten distinct identities still read as
 * one family against the site palette.
 */
const PROJECT_ACCENTS = {
  "01": "#d9b36a", // ochre
  "02": "#b49594", // rose
  "03": "#a8b87e", // lime sage
  "04": "#9fb6c2", // pale blue
  "05": "#c9b1bd", // mauve
  "06": "#7f9172", // sage
  "07": "#c0a173", // tan
  "08": "#b8b3a8", // warm grey
  "09": "#c4705c", // brick
  "10": "#567568", // deep green
};

export const PROJECT_ACCENT_ORDER = [
  "01",
  "09",
  "03",
  "10",
  "04",
  "05",
  "02",
  "06",
  "07",
  "08",
];

export const CARD_COLORS = PROJECT_ACCENT_ORDER.map((id) => PROJECT_ACCENTS[id]);

export function accentFor(id) {
  return PROJECT_ACCENTS[id] ?? "#567568";
}

export default PROJECT_ACCENTS;
