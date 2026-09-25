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

  it("provides an intentional unavailable owner action", () => {
    render(<ForDojosPage />);

    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByRole("main")).toBeDefined();
    const navigation = screen.getByRole("navigation", {
      name: "Owner page navigation",
    });

    const ownerAction = screen.getByRole("button", {
      name: "Owner applications — coming soon",
    });

    expect(ownerAction.hasAttribute("disabled")).toBe(true);
    expect(ownerAction.getAttribute("aria-describedby")).toBe(
      "owner-access-status",
    );
    expect(
      screen.getByText(/There is nothing to submit yet/i),
    ).toBeDefined();
    expect(screen.queryByRole("form")).toBeNull();
    expect(
      within(navigation)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/#dojo-search", "/dojos", "/for-dojos"]);
    expect(
      within(navigation)
        .getByRole("link", { name: "I Own a Dojo" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });
});
