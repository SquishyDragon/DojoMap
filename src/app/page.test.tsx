import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

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
});
