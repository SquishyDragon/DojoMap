import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { karateCurriculum } from "@/data/karate-curriculum";

import { ProgressionNavigator } from "./progression-navigator";

describe("ProgressionNavigator", () => {
  it("shows the full belt journey and marks the current rank", () => {
    render(
      <ProgressionNavigator
        currentRankId="orange-belt"
        ranks={karateCurriculum.ranks}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Belt progression" }),
    ).toBeDefined();
    expect(
      screen.getAllByRole("listitem").map(({ textContent }) => textContent),
    ).toEqual(["White", "Yellow", "Orange", "Green", "Blue"]);
    expect(
      screen.getByText("Orange").closest("li")?.getAttribute("aria-current"),
    ).toBe(
      "step",
    );
  });

  it("renders nothing when there are no ranks", () => {
    const { container } = render(<ProgressionNavigator ranks={[]} />);

    expect(container.childElementCount).toBe(0);
  });
});
