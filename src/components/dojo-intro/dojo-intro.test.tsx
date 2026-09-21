import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { fortMyersKarate } from "@/data/fort-myers-karate";

import { DojoIntro } from "./dojo-intro";

describe("DojoIntro", () => {
  it("introduces the dojo and links to the curriculum journey", () => {
    render(<DojoIntro dojo={fortMyersKarate} />);

    expect(screen.getByText("DojoMap")).toBeDefined();
    expect(screen.getByText("Your Dojo")).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Fort Myers Karate" }),
    ).toBeDefined();
    expect(screen.getByText("Fort Myers, Florida")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Your Path to Black Belt" }),
    ).toHaveProperty("hash", "#curriculum");
  });
});
