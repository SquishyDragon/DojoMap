import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import FortMyersKaratePage from "./fort-myers-karate/page";
import HomePage from "./page";

afterEach(cleanup);

describe("HomePage", () => {
  it("renders DojoMap instead of a dojo-specific curriculum", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Your martial arts journey, mapped.",
      }),
    ).toBeDefined();
    expect(screen.getByText("DojoMap")).toBeDefined();
    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(
      within(navigation)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Search Dojo", "#dojo-search"],
      ["Explore Dojos", "/dojos"],
      ["I Own a Dojo", "/for-dojos"],
    ]);
    expect(
      screen.getByRole("search").querySelector('input[type="search"]'),
    ).not.toBeNull();
    expect(
      screen.getByRole("button", {
        name: "Dojo search is coming in the next step",
      }).hasAttribute("disabled"),
    ).toBe(true);
    expect(screen.queryByText("Fort Myers Karate")).toBeNull();
    expect(document.querySelector("[data-journey-scroll]")).toBeNull();
  });
});

describe("FortMyersKaratePage", () => {
  it("preserves dojo identity, snap structure, rank order, navigation, and external links", () => {
    const { container } = render(<FortMyersKaratePage />);
    const journey = container.querySelector<HTMLElement>(
      "[data-journey-scroll]",
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Fort Myers Karate" }),
    ).toBeDefined();
    expect(journey).not.toBeNull();
    expect(
      Array.from(
        journey!.querySelectorAll<HTMLElement>("[data-journey-section]"),
      ).map((section) => section.id),
    ).toEqual([
      "dojo",
      "white-belt",
      "yellow-belt",
      "orange-belt",
      "green-belt",
      "blue-belt",
      "path-mapped",
    ]);

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
    const externalLink = screen.getByRole("link", {
      name: "Front kick (opens in new tab)",
    });

    expect(externalLink.getAttribute("href")).toBe(
      "https://en.wikipedia.org/wiki/Front_kick",
    );
    expect(externalLink.getAttribute("target")).toBe("_blank");
    expect(externalLink.getAttribute("rel")).toContain("noopener");
    expect(
      screen.getByRole("button", { name: "Roundhouse kick" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 2, name: "The journey continues" }),
    ).toBeDefined();
  });

  it("renders the dojo opening before its curriculum", () => {
    render(<FortMyersKaratePage />);

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
    const { container } = render(<FortMyersKaratePage />);
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
    render(<FortMyersKaratePage />);
    const whiteBelt = document.getElementById("white-belt")!;
    const scrollIntoView = vi.fn();

    whiteBelt.scrollIntoView = scrollIntoView;
    fireEvent.keyDown(window, { key: "ArrowDown" });

    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
  });

  it("leaves ordinary wheel scrolling to the native scroll container", () => {
    const { container } = render(<FortMyersKaratePage />);
    const scrollContainer = container.querySelector("main")!;
    const wheelEvent = new WheelEvent("wheel", {
      cancelable: true,
      deltaY: 240,
    });

    scrollContainer.dispatchEvent(wheelEvent);

    expect(wheelEvent.defaultPrevented).toBe(false);
  });

  it("shows detail for the selected internal technique", () => {
    const { container } = render(<FortMyersKaratePage />);
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
    render(<FortMyersKaratePage />);
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
    render(<FortMyersKaratePage />);
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
    render(<FortMyersKaratePage />);
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
    render(<FortMyersKaratePage />);
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

  it("keeps repeated detail interactions free of stale lifecycle state", () => {
    render(<FortMyersKaratePage />);
    const insideBlock = screen.getByRole("button", { name: "Inside block" });
    const outsideBlock = screen.getByRole("button", {
      name: "Outside block",
    });

    fireEvent.click(insideBlock);
    expect(screen.getAllByRole("complementary")).toHaveLength(1);

    fireEvent.click(outsideBlock);
    expect(screen.getAllByRole("complementary")).toHaveLength(1);
    expect(
      screen.getByRole("complementary", { name: "Outside block" }),
    ).toBeDefined();
    expect(
      screen.queryByText(
        "A defensive motion that travels across the body to redirect an incoming attack.",
      ),
    ).toBeNull();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(document.activeElement).toBe(outsideBlock);

    fireEvent.click(insideBlock);
    expect(screen.getAllByRole("complementary")).toHaveLength(1);
    expect(
      screen.getByRole("complementary", { name: "Inside block" }),
    ).toBeDefined();
    expect(
      screen.queryByText(
        "A defensive motion that redirects an attack away from the body's center line.",
      ),
    ).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Close technique details" }),
    );
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(document.activeElement).toBe(insideBlock);
    expect(insideBlock.getAttribute("aria-expanded")).toBe("false");
    expect(outsideBlock.getAttribute("aria-expanded")).toBe("false");
  });
});
