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

  it("references reusable technique detail without copying rank context", () => {
    const orangeBelt = karateCurriculum.ranks.find(
      (rank) => rank.id === "orange-belt",
    );
    const basics = orangeBelt?.requirements.find(
      (requirement) => requirement.id === "orange-belt-basics",
    );
    const roundhouseKick = basics?.items.find(
      (item) =>
        item.type === "technique" &&
        item.technique.id === "roundhouse-kick",
    );

    expect(roundhouseKick?.type).toBe("technique");
    if (roundhouseKick?.type !== "technique") {
      throw new Error("Expected a technique reference");
    }

    expect(roundhouseKick.technique.name).toBe("Roundhouse kick");
    expect(roundhouseKick.technique.description.length).toBeGreaterThan(0);
    expect("rank" in roundhouseKick.technique).toBe(false);
  });
});
