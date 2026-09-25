import { describe, expect, it } from "vitest";

import { findDojoBySlug } from "@/domain/dojo-directory";

import { dojoDirectory } from "./dojo-directory";
import { fortMyersKarate } from "./fort-myers-karate";

describe("dojoDirectory", () => {
  it("contains the canonical Fort Myers Karate discovery data", () => {
    const entry = findDojoBySlug(dojoDirectory, "fort-myers-karate");

    expect(entry).toBeDefined();
    expect(entry?.dojo).toBe(fortMyersKarate);
    expect(entry?.dojo.name).toBe("Fort Myers Karate");
    expect(entry?.dojo.location).toEqual({
      city: "Fort Myers",
      state: "Florida",
    });
    expect(entry?.dojo.curriculum.discipline).toBe("Karate");
    expect(entry?.dojo.description).not.toHaveLength(0);
  });

  it("uses unique IDs and canonical slugs", () => {
    const ids = dojoDirectory.map(({ dojo }) => dojo.id);
    const slugs = dojoDirectory.map(({ slug }) => slug);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual(["fort-myers-karate"]);
  });

  it("returns no entry for an unknown slug", () => {
    expect(findDojoBySlug(dojoDirectory, "unknown-dojo")).toBeUndefined();
  });
});
