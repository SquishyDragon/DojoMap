import { describe, expect, it } from "vitest";

import { karateCurriculum } from "./karate-curriculum";

describe("karateCurriculum", () => {
  it("contains five ranks in progression order", () => {
    expect(karateCurriculum.ranks).toHaveLength(5);
    expect(karateCurriculum.ranks.map((rank) => rank.order)).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it("gives every rank categorized requirements", () => {
    for (const rank of karateCurriculum.ranks) {
      expect(rank.requirements.length).toBeGreaterThan(0);

      for (const requirement of rank.requirements) {
        expect(requirement.category.length).toBeGreaterThan(0);
        expect(requirement.items.length).toBeGreaterThan(0);
      }
    }
  });

  it("can identify a future internal content destination", () => {
    const orangeBelt = karateCurriculum.ranks.find(
      (rank) => rank.id === "orange-belt",
    );
    const basics = orangeBelt?.requirements.find(
      (requirement) => requirement.id === "orange-belt-basics",
    );
    const roundhouseKick = basics?.items.find(
      (item) => item.id === "roundhouse-kick",
    );

    expect(roundhouseKick?.resource).toEqual({
      type: "internal",
      slug: "roundhouse-kick",
    });
  });
});
