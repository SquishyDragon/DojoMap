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
      items: [
        {
          type: "technique",
          technique: {
            id: "inside-block",
            name: "Inside block",
            description: "A defensive movement across the body.",
            resources: [],
          },
        },
        {
          type: "technique",
          technique: {
            id: "roundhouse-kick",
            name: "Roundhouse kick",
            description: "A kick delivered along a curved path.",
            resources: [],
          },
          resource: {
            type: "external",
            url: "https://example.com/roundhouse-kick",
          },
        },
      ],
    },
    {
      id: "orange-belt-form",
      category: "Form",
      items: [
        {
          id: "foundations-form-2",
          name: "Foundations form 2",
          type: "form",
        },
        {
          id: "unavailable-video",
          name: "Unavailable video",
          type: "knowledge",
          resource: { type: "external", url: "" },
        },
      ],
    },
  ],
} satisfies Rank;

describe("RankCard", () => {
  it("renders the supplied rank name, belt details, and requirements", () => {
    render(<RankCard rank={orangeBelt} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Orange Belt" }),
    ).toBeDefined();
    expect(
      screen.getByRole("article", { name: "Orange Belt" }),
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
    const resourceLink = screen.getByRole("link", {
      name: "Roundhouse kick (opens in new tab)",
    });

    expect(resourceLink.getAttribute("href")).toBe(
      "https://example.com/roundhouse-kick",
    );
    expect(resourceLink.getAttribute("target")).toBe("_blank");
    expect(resourceLink.getAttribute("rel")).toContain("noreferrer");
    expect(screen.getByText("Inside block").closest("a")).toBeNull();
    expect(screen.getByText("Foundations form 2").closest("a")).toBeNull();
    expect(screen.getByText("Unavailable video").closest("a")).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("Foundations form 2")).toBeDefined();
  });
});
