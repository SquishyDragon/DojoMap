import { describe, expect, it } from "vitest";

import { karateCurriculum } from "./karate-curriculum";
import { fortMyersKarate } from "./fort-myers-karate";

describe("fortMyersKarate", () => {
  it("defines the dojo identity and its curriculum", () => {
    expect(fortMyersKarate.name).toBe("Fort Myers Karate");
    expect(fortMyersKarate.location).toEqual({
      city: "Fort Myers",
      state: "Florida",
    });
    expect(fortMyersKarate.description).not.toHaveLength(0);
    expect(fortMyersKarate.curriculum).toBe(karateCurriculum);
  });
});
