import { describe, expect, it, vi } from "vitest";

import { fortMyersKarate } from "@/data/fort-myers-karate";

import DojoPage, { generateStaticParams } from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("DojoPage", () => {
  it("generates canonical routes from the dojo directory", () => {
    expect(generateStaticParams()).toEqual([
      { dojoSlug: "fort-myers-karate" },
    ]);
  });

  it("resolves Fort Myers Karate from its directory slug", async () => {
    const page = await DojoPage({
      params: Promise.resolve({ dojoSlug: "fort-myers-karate" }),
    });

    expect(page.props.dojo).toBe(fortMyersKarate);
  });
});
