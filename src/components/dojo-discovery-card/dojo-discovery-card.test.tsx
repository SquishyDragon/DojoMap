import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { DojoSearchRecord } from "@/domain/dojo-directory";

import { DojoDiscoveryCard } from "./dojo-discovery-card";

afterEach(cleanup);

const dojo = {
  slug: "fort-myers-karate",
  name: "Fort Myers Karate",
  location: "Fort Myers, Florida",
  discipline: "Karate",
  summary: "Your path from first lesson to black belt.",
} satisfies DojoSearchRecord;

describe("DojoDiscoveryCard", () => {
  it("renders directory data and the canonical route", () => {
    render(<DojoDiscoveryCard dojo={dojo} index={0} />);

    expect(
      screen.getByRole("heading", { level: 2, name: dojo.name }),
    ).toBeDefined();
    expect(screen.getByText(dojo.location)).toBeDefined();
    expect(screen.getByText(dojo.discipline)).toBeDefined();
    expect(screen.getByText(dojo.summary)).toBeDefined();
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "/fort-myers-karate",
    );
  });

  it("supports the compact search-result presentation", () => {
    render(<DojoDiscoveryCard dojo={dojo} variant="compact" />);

    expect(screen.getByRole("article")).toBeDefined();
    expect(screen.queryByText("01")).toBeNull();
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "/fort-myers-karate",
    );
  });
});
