import { notFound } from "next/navigation";

import { DojoJourney } from "@/components/dojo-journey/dojo-journey";
import { dojoDirectory } from "@/data/dojo-directory";
import { findDojoBySlug } from "@/domain/dojo-directory";

export const dynamicParams = false;

export function generateStaticParams() {
  return dojoDirectory.map(({ slug }) => ({ dojoSlug: slug }));
}

export default async function DojoPage({
  params,
}: {
  params: Promise<{ dojoSlug: string }>;
}) {
  const { dojoSlug } = await params;
  const entry = findDojoBySlug(dojoDirectory, dojoSlug);

  if (!entry) {
    notFound();
  }

  return <DojoJourney dojo={entry.dojo} />;
}
