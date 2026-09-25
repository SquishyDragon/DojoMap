import type { Dojo } from "./dojo";

export type DojoDirectoryEntry = {
  slug: string;
  dojo: Dojo;
};

export type DojoSearchRecord = {
  slug: string;
  name: string;
  location: string;
  discipline: string;
  summary: string;
};

export function findDojoBySlug(
  directory: readonly DojoDirectoryEntry[],
  slug: string,
) {
  return directory.find((entry) => entry.slug === slug);
}

export function toDojoSearchRecord({ slug, dojo }: DojoDirectoryEntry) {
  return {
    slug,
    name: dojo.name,
    location: `${dojo.location.city}, ${dojo.location.state}`,
    discipline: dojo.curriculum.discipline,
    summary: dojo.description,
  } satisfies DojoSearchRecord;
}

export function searchDojos(
  records: readonly DojoSearchRecord[],
  query: string,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return records.filter((record) =>
    [record.name, record.location, record.discipline].some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  );
}
