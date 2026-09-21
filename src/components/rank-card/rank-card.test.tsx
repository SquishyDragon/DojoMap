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
      items: ["Inside block"],
    },
  ],
} satisfies Rank;

describe("RankCard", () => {
  it("renders the supplied rank name and belt details", () => {
    render(<RankCard rank={orangeBelt} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Orange Belt" }),
    ).toBeDefined();
    expect(screen.getByText("Rank 3")).toBeDefined();
    expect(screen.getByText("Orange belt")).toBeDefined();
  });
});
