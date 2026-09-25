import { fortMyersKarate } from "@/data/fort-myers-karate";
import type { DojoDirectoryEntry } from "@/domain/dojo-directory";

export const dojoDirectory = [
  {
    slug: "fort-myers-karate",
    dojo: fortMyersKarate,
  },
] as const satisfies readonly DojoDirectoryEntry[];
