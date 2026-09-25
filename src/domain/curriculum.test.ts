import { describe, expect, it } from "vitest";

import {
  getCurriculumItemId,
  getCurriculumItemName,
  getTechniqueContexts,
  type Curriculum,
  type Technique,
} from "./curriculum";

const frontStance = {
  id: "front-stance",
  name: "Front stance",
  description: "A stable forward-facing stance.",
  resources: [
    {
      type: "video",
      label: "Front stance demonstration",
      url: "https://example.com/front-stance-video",
    },
    {
      type: "article",
      label: "Front stance guide",
      url: "https://example.com/front-stance-guide",
    },
    {
      type: "note",
      text: "Keep the front knee aligned over the toes.",
    },
  ],
} as const satisfies Technique;

const straightPunch = {
  id: "straight-punch",
  name: "Straight punch",
  description: "A direct punch delivered on a straight path.",
  resources: [],
} as const satisfies Technique;

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
              type: "technique",
              technique: frontStance,
            },
            {
              type: "technique",
              technique: straightPunch,
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
    expect(getCurriculumItemId(firstRank.requirements[0].items[0])).toBe(
      "front-stance",
    );
    expect(getCurriculumItemName(firstRank.requirements[0].items[0])).toBe(
      "Front stance",
    );
    expect(frontStance.resources.map((resource) => resource.type)).toEqual([
      "video",
      "article",
      "note",
    ]);
    expect(straightPunch.resources).toHaveLength(0);

    const [context] = getTechniqueContexts(sampleCurriculum, "front-stance");

    expect(context.rank.name).toBe("White Belt");
    expect(context.requirement.category).toBe("Basics");
    expect(context.item.technique).toBe(frontStance);
  });
});
