import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import NotFound from "./not-found";

afterEach(cleanup);

describe("NotFound", () => {
  it("provides intentional recovery paths", () => {
    render(<NotFound />);

    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByRole("contentinfo")).toBeDefined();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This dojo isn’t on the map.",
      }),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: /explore mapped dojos/i })
        .getAttribute("href"),
    ).toBe("/dojos");
    expect(
      screen
        .getByRole("link", { name: "Return to DojoMap" })
        .getAttribute("href"),
    ).toBe("/");
  });
});
