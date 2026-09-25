import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { DojoSearchRecord } from "@/domain/dojo-directory";

import { DojoSearch } from "./dojo-search";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

afterEach(() => {
  cleanup();
  push.mockClear();
});

const entries = [
  {
    slug: "fort-myers-karate",
    name: "Fort Myers Karate",
    location: "Fort Myers, Florida",
    discipline: "Karate",
    summary: "Your path from first lesson to black belt.",
  },
] as const satisfies readonly DojoSearchRecord[];

describe("DojoSearch", () => {
  it("keeps the blank state quiet", () => {
    render(<DojoSearch entries={entries} />);

    expect(screen.queryByRole("list", { name: "Dojo search results" })).toBeNull();
    expect(screen.queryByText(/no dojos match/i)).toBeNull();
  });

  it("returns Fort Myers Karate with its canonical route", () => {
    render(<DojoSearch entries={entries} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "fort myers" },
    });

    const results = screen.getByRole("list", { name: "Dojo search results" });
    const link = within(results).getByRole("link", {
      name: /Fort Myers Karate.*Fort Myers, Florida.*View curriculum/i,
    });

    expect(link.getAttribute("href")).toBe("/fort-myers-karate");
    expect(
      screen.getByRole("button", { name: "Open first matching dojo" })
        .hasAttribute("disabled"),
    ).toBe(false);
  });

  it("opens the first matching dojo when the search is submitted", () => {
    render(<DojoSearch entries={entries} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "karate" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Open first matching dojo" }),
    );

    expect(push).toHaveBeenCalledWith("/fort-myers-karate");
  });

  it("shows a directory path when no dojo matches", () => {
    render(<DojoSearch entries={entries} />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "unknown dojo" },
    });

    expect(screen.getByText(/no dojos match/i)).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Browse all dojos" }).getAttribute("href"),
    ).toBe("/dojos");
    expect(
      screen.getByRole("button", { name: "Open first matching dojo" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});
