import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ForDojosPage from "./page";

afterEach(cleanup);

describe("ForDojosPage", () => {
  it("explains the owner value proposition and current boundary", () => {
    render(<ForDojosPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Give students a path they can see.",
      }),
    ).toBeDefined();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("Dojo onboarding is not open yet.")).toBeDefined();
    expect(
      screen.getByText(/There is no self-service listing, account, or owner dashboard/i),
    ).toBeDefined();
  });

  it("does not imply an available onboarding workflow", () => {
    render(<ForDojosPage />);

    const navigation = screen.getByRole("navigation", {
      name: "Owner page navigation",
    });

    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("form")).toBeNull();
    expect(
      within(navigation)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/#dojo-search", "/dojos", "/for-dojos"]);
  });
});
