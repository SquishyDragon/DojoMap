import { describe, expect, it } from "vitest";

import type { Curriculum } from "./curriculum";

const sampleCurriculum = {
  id: "sample-karate",
  name: "Sample Karate Curriculum",
  discipline: "Karate",
  ranks: [
    {
      id: "white-belt",
      name: "White Belt",
      order: 1,
      belt: {
        name: "White",
        color: "#ffffff",
      },
      requirements: [
        {
          id: "white-belt-basics",
          category: "Basics",
          items: ["Front stance", "Straight punch"],
        },
      ],
    },
  ],
} satisfies Curriculum;

describe("Curriculum model", () => {
  it("represents ordered ranks and categorized requirements", () => {
    const firstRank = sampleCurriculum.ranks[0];

    expect(firstRank.order).toBe(1);
    expect(firstRank.belt.name).toBe("White");
    expect(firstRank.requirements[0].items).toContain("Front stance");
  });
});
