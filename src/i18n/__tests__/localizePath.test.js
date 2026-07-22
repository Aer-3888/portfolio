import { describe, it, expect } from "vitest";
import { getLangFromPath, stripLang, localizePath } from "../localizePath";

describe("getLangFromPath", () => {
  it("detects fr prefix", () => {
    expect(getLangFromPath("/fr")).toBe("fr");
    expect(getLangFromPath("/fr/projects")).toBe("fr");
  });
  it("defaults to en", () => {
    expect(getLangFromPath("/")).toBe("en");
    expect(getLangFromPath("/projects")).toBe("en");
    expect(getLangFromPath("/french-toast")).toBe("en"); // not a lang segment
  });
});

describe("stripLang", () => {
  it("removes fr prefix", () => {
    expect(stripLang("/fr")).toBe("/");
    expect(stripLang("/fr/projects/03")).toBe("/projects/03");
  });
  it("leaves en paths untouched", () => {
    expect(stripLang("/projects")).toBe("/projects");
    expect(stripLang("/")).toBe("/");
  });
});

describe("localizePath", () => {
  it("prefixes fr", () => {
    expect(localizePath("/projects", "fr")).toBe("/fr/projects");
    expect(localizePath("/", "fr")).toBe("/fr");
  });
  it("keeps en unprefixed", () => {
    expect(localizePath("/projects", "en")).toBe("/projects");
    expect(localizePath("/", "en")).toBe("/");
  });
  it("is idempotent on already-prefixed input", () => {
    expect(localizePath("/fr/projects", "fr")).toBe("/fr/projects");
    expect(localizePath("/fr/projects", "en")).toBe("/projects");
  });
});
