import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Rank } from "@/domain/curriculum";

import { RankCard } from "./rank-card";

const orangeBelt = {
  id: "orange-belt",
  name: "Orange Belt",
  order: 3,
  belt: {
    name: "Orange",
    color: "#ea7c2b",
  },
  requirements: [
    {
      id: "orange-belt-basics",
      category: "Basics",
      items: ["Inside block", "Roundhouse kick"],
    },
    {
      id: "orange-belt-form",
      category: "Form",
      items: ["Foundations form 2"],
    },
  ],
} satisfies Rank;

describe("RankCard", () => {
  it("renders the supplied rank name, belt details, and requirements", () => {
    render(<RankCard rank={orangeBelt} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Orange Belt" }),
    ).toBeDefined();
    expect(screen.getByText("Rank 3")).toBeDefined();
    expect(screen.getByText("Orange belt")).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 3, name: "Basics" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 3, name: "Form" }),
    ).toBeDefined();
    expect(screen.getByText("Inside block")).toBeDefined();
    expect(screen.getByText("Roundhouse kick")).toBeDefined();
    expect(screen.getByText("Foundations form 2")).toBeDefined();
  });
});
