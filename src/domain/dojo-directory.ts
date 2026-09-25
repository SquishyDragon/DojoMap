import type { Dojo } from "./dojo";

export type DojoDirectoryEntry = {
  slug: string;
  dojo: Dojo;
};

export function findDojoBySlug(
  directory: readonly DojoDirectoryEntry[],
  slug: string,
) {
  return directory.find((entry) => entry.slug === slug);
}
