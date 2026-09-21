import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { Curriculum, Rank } from "@/domain/curriculum";

import { CurriculumMap } from "./curriculum-map";

afterEach(cleanup);

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

const emptyCurriculum = {
  id: "empty-test",
  name: "Empty Test",
  discipline: "Karate",
  ranks: [],
} satisfies Curriculum;

describe("CurriculumMap", () => {
  it("renders every rank exactly once in dataset order", () => {
    const { getAllByRole } = render(
      <CurriculumMap curriculum={curriculumInDatasetOrder} />,
    );

    const rankHeadings = getAllByRole("heading", { level: 2 });

    expect(rankHeadings.map((heading) => heading.textContent)).toEqual([
      "Blue Belt",
      "White Belt",
      "Orange Belt",
    ]);
  });

  it("renders an intentional state when the curriculum is missing", () => {
    const { getByRole } = render(<CurriculumMap />);

    expect(getByRole("status")).toBeDefined();
    expect(
      getByRole("heading", { level: 2, name: "Nothing to map yet" }),
    ).toBeDefined();
  });

  it("renders an intentional state when the curriculum has no ranks", () => {
    const { getByRole } = render(
      <CurriculumMap curriculum={emptyCurriculum} />,
    );

    expect(getByRole("status")).toBeDefined();
    expect(
      getByRole("heading", { level: 2, name: "No ranks yet" }),
    ).toBeDefined();
  });
});
