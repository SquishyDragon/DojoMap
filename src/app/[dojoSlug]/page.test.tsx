import { describe, expect, it, vi } from "vitest";

import { dojoDirectory } from "@/data/dojo-directory";
import { fortMyersKarate } from "@/data/fort-myers-karate";

import DojoPage, { dynamicParams, generateStaticParams } from "./page";

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/navigation", () => ({
  notFound,
}));

describe("DojoPage", () => {
  it("generates canonical routes from the dojo directory", () => {
    expect(dynamicParams).toBe(false);
    expect(generateStaticParams()).toEqual(
      dojoDirectory.map(({ slug }) => ({ dojoSlug: slug })),
    );
  });

  it("resolves Fort Myers Karate from its directory slug", async () => {
    const page = await DojoPage({
      params: Promise.resolve({ dojoSlug: "fort-myers-karate" }),
    });

    expect(page.props.dojo).toBe(fortMyersKarate);
  });

  it("terminates unknown dojo routes through the not-found boundary", async () => {
    await expect(
      DojoPage({
        params: Promise.resolve({ dojoSlug: "unknown-dojo" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
    expect(notFound).toHaveBeenCalledWith();
  });
});
