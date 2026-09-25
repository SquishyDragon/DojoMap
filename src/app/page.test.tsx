import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "./page";

afterEach(cleanup);

describe("Home", () => {
  it("renders the complete supported curriculum journey", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Fort Myers Karate" }),
    ).toBeDefined();

    const curriculum = screen.getByRole("region", {
      name: "Foundations Karate rank progression",
    });
    const rankNames = within(curriculum)
      .getAllByRole("article")
      .map((article) =>
        within(article).getByRole("heading", { level: 2 }).textContent,
      );

    expect(rankNames).toEqual([
      "White Belt",
      "Yellow Belt",
      "Orange Belt",
      "Green Belt",
      "Blue Belt",
    ]);
    const navigator = screen.getByRole("navigation", {
      name: "Belt progression",
    });

    expect(
      within(navigator)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "#white-belt",
      "#yellow-belt",
      "#orange-belt",
      "#green-belt",
      "#blue-belt",
    ]);
    expect(
      screen
        .getByRole("link", { name: "Front kick (opens in new tab)" })
        .getAttribute("href"),
    ).toBe("https://en.wikipedia.org/wiki/Front_kick");
    expect(
      screen.getByRole("button", { name: "Roundhouse kick" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 2, name: "The journey continues" }),
    ).toBeDefined();
  });

  it("renders the dojo opening before its curriculum", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Fort Myers Karate" }),
    ).toBeDefined();
    expect(
      screen.getByRole("region", {
        name: "Foundations Karate rank progression",
      }),
    ).toBeDefined();
  });

  it("updates the progression marker to the centered rank on scroll", () => {
    const { container } = render(<Home />);
    const scrollContainer = container.querySelector("main")!;
    const positions = new Map([
      ["dojo", -800],
      ["white-belt", 0],
      ["yellow-belt", 800],
      ["orange-belt", 1600],
      ["green-belt", 2400],
      ["blue-belt", 3200],
      ["path-mapped", 4000],
    ]);

    Object.defineProperty(scrollContainer, "clientHeight", { value: 800 });
    scrollContainer.getBoundingClientRect = () =>
      ({ height: 800, top: 0 }) as DOMRect;
    positions.forEach((_, id) => {
      document.getElementById(id)!.getBoundingClientRect = () =>
        ({ height: 800, top: positions.get(id)! }) as DOMRect;
    });

    fireEvent.scroll(scrollContainer);

    expect(
      screen
        .getByRole("link", { name: "White" })
        .getAttribute("aria-current"),
    ).toBe("step");
  });

  it("moves to the next journey section with the keyboard", () => {
    render(<Home />);
    const whiteBelt = document.getElementById("white-belt")!;
    const scrollIntoView = vi.fn();

    whiteBelt.scrollIntoView = scrollIntoView;
    fireEvent.keyDown(window, { key: "ArrowDown" });

    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
  });

  it("leaves ordinary wheel scrolling to the native scroll container", () => {
    const { container } = render(<Home />);
    const scrollContainer = container.querySelector("main")!;
    const wheelEvent = new WheelEvent("wheel", {
      cancelable: true,
      deltaY: 240,
    });

    scrollContainer.dispatchEvent(wheelEvent);

    expect(wheelEvent.defaultPrevented).toBe(false);
  });

  it("shows detail for the selected internal technique", () => {
    const { container } = render(<Home />);
    const scrollContainer = container.querySelector("main")!;
    const techniqueButton = screen.getByRole("button", {
      name: "Inside block",
    });
    const otherTechniqueButton = screen.getByRole("button", {
      name: "Outside block",
    });

    scrollContainer.scrollTop = 1200;
    expect(techniqueButton.getAttribute("aria-expanded")).toBe("false");
    expect(techniqueButton.getAttribute("aria-controls")).toBe(
      "technique-detail-panel",
    );

    fireEvent.click(techniqueButton);

    const detail = screen.getByRole("complementary", { name: "Inside block" });
    const detailHeading = screen.getByRole("heading", {
      level: 2,
      name: "Inside block",
    });
    const detailDescription = screen.getByText(
      "A defensive motion that travels across the body to redirect an incoming attack.",
    );

    expect(detail.id).toBe("technique-detail-panel");
    expect(detail.getAttribute("aria-labelledby")).toBe(detailHeading.id);
    expect(detail.getAttribute("aria-describedby")).toBe(
      detailDescription.id,
    );
    expect(techniqueButton.getAttribute("aria-expanded")).toBe("true");
    expect(otherTechniqueButton.getAttribute("aria-expanded")).toBe("false");
    expect(
      detailDescription,
    ).toBeDefined();
    expect(
      screen.getByRole("complementary", { name: "Inside block" }).textContent,
    ).toContain("Orange Belt");

    fireEvent.click(
      screen.getByRole("button", { name: "Close technique details" }),
    );

    expect(screen.queryByRole("complementary")).toBeNull();
    expect(techniqueButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(techniqueButton);
    expect(scrollContainer.scrollTop).toBe(1200);
  });

  it("preserves external curriculum links without opening details", () => {
    render(<Home />);
    const externalTechnique = screen.getByRole("link", {
      name: "Front kick (opens in new tab)",
    });

    externalTechnique.addEventListener("click", (event) =>
      event.preventDefault(),
    );
    fireEvent.click(externalTechnique);

    expect(externalTechnique.getAttribute("href")).toBe(
      "https://en.wikipedia.org/wiki/Front_kick",
    );
    expect(externalTechnique.getAttribute("target")).toBe("_blank");
    expect(externalTechnique.getAttribute("rel")).toContain("noopener");
    expect(externalTechnique.getAttribute("rel")).toContain("noreferrer");
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Front kick" }),
    ).toBeNull();
  });

  it("moves focus into details and dismisses them with Escape", () => {
    render(<Home />);
    const techniqueButton = screen.getByRole("button", {
      name: "Inside block",
    });

    techniqueButton.focus();
    fireEvent.click(techniqueButton, { detail: 0 });

    const closeButton = screen.getByRole("button", {
      name: "Close technique details",
    });

    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("complementary")).toBeNull();
    expect(document.activeElement).toBe(techniqueButton);
  });

  it("does not move the journey with arrow keys from technique details", () => {
    render(<Home />);
    const techniqueButton = screen.getByRole("button", {
      name: "Inside block",
    });
    const whiteBelt = document.getElementById("white-belt")!;
    const scrollIntoView = vi.fn();

    whiteBelt.scrollIntoView = scrollIntoView;
    fireEvent.click(techniqueButton);
    fireEvent.keyDown(
      screen.getByRole("button", { name: "Close technique details" }),
      { key: "ArrowDown" },
    );

    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("shows the corresponding curriculum data when techniques are switched", () => {
    render(<Home />);
    const insideBlock = screen.getByRole("button", { name: "Inside block" });
    const outsideBlock = screen.getByRole("button", {
      name: "Outside block",
    });

    fireEvent.click(insideBlock);

    expect(
      screen.getByRole("complementary", { name: "Inside block" }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "A defensive motion that travels across the body to redirect an incoming attack.",
      ),
    ).toBeDefined();
    expect(insideBlock.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(outsideBlock);

    expect(screen.queryByText("Inside block", { selector: "h2" })).toBeNull();
    expect(
      screen.getByRole("complementary", { name: "Outside block" }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "A defensive motion that redirects an attack away from the body's center line.",
      ),
    ).toBeDefined();
    expect(insideBlock.getAttribute("aria-expanded")).toBe("false");
    expect(outsideBlock.getAttribute("aria-expanded")).toBe("true");
  });
});
