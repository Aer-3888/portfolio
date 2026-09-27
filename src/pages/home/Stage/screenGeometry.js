// The phone screen in me_.webp, measured in source pixels.
export const PORTRAIT = { width: 796, height: 1024 };
export const SCREEN = { cx: 181.7, cy: 445.1, width: 150, height: 324, rotate: -3.4 };

// Where the key sits on the Waiki home screen, so the zoom stays on it.
export const KEY_ORIGIN = { x: 0.5, y: 0.36 };

export const WAIKI_SCREEN = `${import.meta.env.BASE_URL}images/optimized/waiki-screen.webp`;

// The hero figure crops the portrait to 4:5 from the top.
const FIGURE_HEIGHT = PORTRAIT.width * 1.25;

export const screenBox = {
  left: `${((SCREEN.cx - SCREEN.width / 2) / PORTRAIT.width) * 100}%`,
  top: `${((SCREEN.cy - SCREEN.height / 2) / FIGURE_HEIGHT) * 100}%`,
  width: `${(SCREEN.width / PORTRAIT.width) * 100}%`,
  height: `${(SCREEN.height / FIGURE_HEIGHT) * 100}%`,
};
