import { karateCurriculum } from "@/data/karate-curriculum";
import type { Dojo } from "@/domain/dojo";

export const fortMyersKarate = {
  id: "fort-myers-karate",
  name: "Fort Myers Karate",
  location: {
    city: "Fort Myers",
    state: "Florida",
  },
  description: "Your path from first lesson to black belt.",
  curriculum: karateCurriculum,
} as const satisfies Dojo;
