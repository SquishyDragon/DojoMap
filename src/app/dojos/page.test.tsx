import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { dojoDirectory } from "@/data/dojo-directory";

import DojosPage from "./page";

afterEach(cleanup);

describe("DojosPage", () => {
  it("renders every directory dojo exactly once with its canonical route", () => {
    render(<DojosPage />);

    const directory = screen.getByRole("region", { name: "Available dojos" });
    const cards = within(directory).getAllByRole("article");

    expect(cards).toHaveLength(dojoDirectory.length);
    expect(
      cards.map((card) =>
        within(card).getByRole("heading", { level: 2 }).textContent,
      ),
    ).toEqual(dojoDirectory.map(({ dojo }) => dojo.name));
    expect(
      within(cards[0])
        .getByRole("link", { name: /view curriculum/i })
        .getAttribute("href"),
    ).toBe("/fort-myers-karate");
  });

  it("provides navigation back to search and the owner path", () => {
    render(<DojosPage />);

    const navigation = screen.getByRole("navigation", {
      name: "Directory navigation",
    });

    expect(
      within(navigation)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/#dojo-search", "/dojos", "/for-dojos"]);
  });
});
