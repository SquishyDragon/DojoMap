import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { karateCurriculum } from "@/data/karate-curriculum";

import { ProgressionNavigator } from "./progression-navigator";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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
      screen.getByText("Orange").closest("li")?.getAttribute("aria-current"),
    ).toBe(
      "step",
    );
  });

  it("renders nothing when there are no ranks", () => {
    const { container } = render(<ProgressionNavigator ranks={[]} />);

    expect(container.childElementCount).toBe(0);
  });

  it("updates the current rank when a section enters the viewport center", () => {
    let notifyIntersection:
      | IntersectionObserverCallback
      | undefined;

    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        notifyIntersection = callback;
      }

      disconnect = vi.fn();
      observe = vi.fn();
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    render(
      <main data-journey-scroll>
        <section id="dojo" />
        {karateCurriculum.ranks.map((rank) => (
          <section id={rank.id} key={rank.id} />
        ))}
        <ProgressionNavigator ranks={karateCurriculum.ranks} />
      </main>,
    );

    act(() => {
      notifyIntersection?.(
        [
          {
            intersectionRatio: 0.1,
            isIntersecting: true,
            target: document.getElementById("orange-belt")!,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(
      screen.getByText("Orange").closest("li")?.getAttribute("aria-current"),
    ).toBe("step");
    expect(
      screen.getByText("White").closest("li")?.hasAttribute("aria-current"),
    ).toBe(false);
  });
});
