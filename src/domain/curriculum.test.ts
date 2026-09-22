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
          items: [
            {
              id: "front-stance",
              name: "Front stance",
              type: "technique",
            },
            {
              id: "straight-punch",
              name: "Straight punch",
              type: "technique",
            },
          ],
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
    expect(firstRank.requirements[0].items[0].name).toBe("Front stance");
  });
});
