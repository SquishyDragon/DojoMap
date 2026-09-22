import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "./page";

afterEach(cleanup);

describe("Home", () => {
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
});
