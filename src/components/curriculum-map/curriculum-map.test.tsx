import { cleanup, render, within } from "@testing-library/react";
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

const variableCurriculum = {
  id: "variable-test",
  name: "Variable Test",
  discipline: "Karate",
  ranks: [
    {
      ...makeRank("white-belt", "White Belt", 1),
      requirements: [
        {
          id: "white-belt-form",
          category: "Forms",
          items: [
            { id: "basic-form-1", name: "Basic Form 1", type: "form" },
          ],
        },
      ],
    },
    {
      ...makeRank("yellow-belt", "Yellow Belt", 2),
      requirements: [
        {
          id: "yellow-belt-techniques",
          category: "Techniques",
          items: [
            { id: "front-kick", name: "Front kick", type: "technique" },
            { id: "high-block", name: "High block", type: "technique" },
          ],
        },
        {
          id: "yellow-belt-knowledge",
          category: "Knowledge",
          items: [
            {
              id: "dojo-etiquette",
              name: "Dojo etiquette",
              type: "knowledge",
            },
          ],
        },
      ],
    },
  ],
} satisfies Curriculum;

describe("CurriculumMap", () => {
  it("renders every rank exactly once in dataset order", () => {
    const { container, getAllByRole } = render(
      <CurriculumMap curriculum={curriculumInDatasetOrder} />,
    );

    const rankHeadings = getAllByRole("article").map((article) =>
      within(article).getByRole("heading", { level: 2 }),
    );

    expect(rankHeadings.map((heading) => heading.textContent)).toEqual([
      "Blue Belt",
      "White Belt",
      "Orange Belt",
    ]);
    const rankSections = Array.from(
      container.querySelectorAll<HTMLElement>("ol > li"),
    );

    expect(rankSections.map((section) => section.id)).toEqual([
      "blue-belt",
      "white-belt",
      "orange-belt",
    ]);
    expect(
      rankSections.map((section) =>
        section.style.getPropertyValue("--belt-color"),
      ),
    ).toEqual(["#cccccc", "#cccccc", "#cccccc"]);
  });

  it("renders ranks with different category and item counts", () => {
    const { container } = render(
      <CurriculumMap curriculum={variableCurriculum} />,
    );
    const rankSections = Array.from(
      container.querySelectorAll<HTMLElement>("ol > li"),
    );
    const whiteBelt = within(rankSections[0]);
    const yellowBelt = within(rankSections[1]);

    expect(
      whiteBelt.getAllByRole("heading", { level: 3 }).map(({ textContent }) =>
        textContent,
      ),
    ).toEqual(["Forms"]);
    expect(whiteBelt.getAllByRole("listitem")).toHaveLength(1);
    expect(whiteBelt.getByText("Basic Form 1")).toBeDefined();

    expect(
      yellowBelt
        .getAllByRole("heading", { level: 3 })
        .map(({ textContent }) => textContent),
    ).toEqual(["Techniques", "Knowledge"]);
    expect(yellowBelt.getAllByRole("listitem")).toHaveLength(3);
    expect(yellowBelt.getByText("Front kick")).toBeDefined();
    expect(yellowBelt.getByText("High block")).toBeDefined();
    expect(yellowBelt.getByText("Dojo etiquette")).toBeDefined();
  });

  it("ends with a separate, intentional journey conclusion", () => {
    const { container, getByText } = render(
      <CurriculumMap curriculum={curriculumInDatasetOrder} />,
    );
    const rankSections = Array.from(
      container.querySelectorAll<HTMLElement>("ol > li"),
    );

    const conclusion = container.querySelector<HTMLElement>("#path-mapped")!;

    expect(rankSections).toHaveLength(3);
    expect(
      rankSections.every(
        (section) => within(section).queryByText("Current map complete") === null,
      ),
    ).toBe(true);
    expect(conclusion.hasAttribute("data-journey-section")).toBe(true);
    expect(conclusion.dataset.rankId).toBe("orange-belt");
    expect(getByText("Current map complete")).toBeDefined();
    expect(
      getByText("The journey continues", { selector: "h2" }),
    ).toBeDefined();
  });

  it.each([undefined, null])(
    "renders an intentional state when the curriculum is %s",
    (curriculum) => {
      const { getByRole, getByText, queryByRole } = render(
        <CurriculumMap curriculum={curriculum} />,
      );

      expect(getByRole("status")).toBeDefined();
      expect(
        getByRole("heading", { level: 2, name: "Nothing to map yet" }),
      ).toBeDefined();
      expect(getByText("Curriculum data could not be loaded.")).toBeDefined();
      expect(queryByRole("list")).toBeNull();
    },
  );

  it("renders an intentional state when the curriculum has no ranks", () => {
    const { getByRole, getByText, queryByRole } = render(
      <CurriculumMap curriculum={emptyCurriculum} />,
    );

    expect(getByRole("status")).toBeDefined();
    expect(
      getByRole("heading", { level: 2, name: "No ranks yet" }),
    ).toBeDefined();
    expect(
      getByText("This curriculum does not have any ranks to display."),
    ).toBeDefined();
    expect(getByText("Empty Test")).toBeDefined();
    expect(queryByRole("list")).toBeNull();
  });
});
