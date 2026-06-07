import { describe, it, expect, beforeEach } from "vitest";

const STORAGE_KEY = "hasVisitedProjects";

function shouldSkipIntro() {
  return !!localStorage.getItem(STORAGE_KEY);
}

function markVisited() {
  localStorage.setItem(STORAGE_KEY, "1");
}

describe("warp gate localStorage logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows intro on first visit", () => {
    expect(shouldSkipIntro()).toBe(false);
  });

  it("skips intro after marking visited", () => {
    markVisited();
    expect(shouldSkipIntro()).toBe(true);
  });

  it("persists across multiple calls", () => {
    markVisited();
    expect(shouldSkipIntro()).toBe(true);
    expect(shouldSkipIntro()).toBe(true);
  });
});
