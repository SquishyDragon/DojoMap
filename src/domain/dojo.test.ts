import { describe, expect, it } from "vitest";

import type { Curriculum } from "./curriculum";
import type { Dojo } from "./dojo";

const curriculum: Curriculum = {
  id: "sample-karate",
  name: "Sample Karate Curriculum",
  discipline: "Karate",
  ranks: [],
};

const dojo = {
  id: "sample-dojo",
  name: "Sample Dojo",
  location: {
    city: "Fort Myers",
    state: "Florida",
  },
  description: "A place to learn and grow.",
  curriculum,
} satisfies Dojo;

describe("Dojo model", () => {
  it("associates dojo identity and location with a curriculum", () => {
    expect(dojo.name).toBe("Sample Dojo");
    expect(dojo.location).toEqual({ city: "Fort Myers", state: "Florida" });
    expect(dojo.curriculum).toBe(curriculum);
  });
});
