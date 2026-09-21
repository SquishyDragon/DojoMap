import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Curriculum, Rank } from "@/domain/curriculum";

import { CurriculumMap } from "./curriculum-map";

function makeRank(id: string, name: string, order: number): Rank {
  return {
    id,
    name,
    order,
    belt: {
      name: name.replace(" Belt", ""),
      color: "#cccccc",
    },
    requirements: [],
  };
}

const curriculumInDatasetOrder = {
  id: "ordering-test",
  name: "Ordering Test",
  discipline: "Karate",
  ranks: [
    makeRank("blue-belt", "Blue Belt", 5),
    makeRank("white-belt", "White Belt", 1),
    makeRank("orange-belt", "Orange Belt", 3),
  ],
} satisfies Curriculum;

describe("CurriculumMap", () => {
  it("renders every rank exactly once in dataset order", () => {
    render(<CurriculumMap curriculum={curriculumInDatasetOrder} />);

    const rankHeadings = screen.getAllByRole("heading", { level: 2 });

    expect(rankHeadings.map((heading) => heading.textContent)).toEqual([
      "Blue Belt",
      "White Belt",
      "Orange Belt",
    ]);
  });
});
