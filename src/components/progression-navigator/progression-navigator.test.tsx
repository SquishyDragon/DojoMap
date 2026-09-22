import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { karateCurriculum } from "@/data/karate-curriculum";

import { ProgressionNavigator } from "./progression-navigator";

afterEach(() => {
  cleanup();
});

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
      screen.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual([
      "#white-belt",
      "#yellow-belt",
      "#orange-belt",
      "#green-belt",
      "#blue-belt",
    ]);
    expect(
      screen
        .getByRole("link", { name: "Orange" })
        .getAttribute("aria-current"),
    ).toBe("step");
    expect(
      screen.getByRole("link", { name: "Yellow" }).getAttribute("aria-current"),
    ).toBeNull();
  });

  it("renders nothing when there are no ranks", () => {
    const { container } = render(<ProgressionNavigator ranks={[]} />);

    expect(container.childElementCount).toBe(0);
  });
});
