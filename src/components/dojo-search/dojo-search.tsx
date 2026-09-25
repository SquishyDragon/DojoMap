"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { DojoDiscoveryCard } from "@/components/dojo-discovery-card/dojo-discovery-card";
import {
  searchDojos,
  type DojoSearchRecord,
} from "@/domain/dojo-directory";

import styles from "./dojo-search.module.css";

export function DojoSearch({
  entries,
}: {
  entries: readonly DojoSearchRecord[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDojos(entries, query), [entries, query]);
  const hasQuery = query.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]) {
      router.push(`/${results[0].slug}`);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit} role="search">
      <label htmlFor="dojo-search">Search for your dojo</label>
      <div className={styles.control}>
        <span className={styles.icon} aria-hidden="true" />
        <input
          autoComplete="off"
          id="dojo-search"
          name="dojo"
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search by dojo or city"
          type="search"
          value={query}
        />
        <button
          aria-label="Open first matching dojo"
          disabled={results.length === 0}
          type="submit"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {hasQuery ? (
        <div className={styles.results} aria-live="polite">
          {results.length > 0 ? (
            <ul aria-label="Dojo search results">
              {results.map((result) => (
                <li key={result.slug}>
                  <DojoDiscoveryCard dojo={result} variant="compact" />
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No dojos match “{query.trim()}”. <Link href="/dojos">Browse all dojos</Link>
            </p>
          )}
        </div>
      ) : null}
    </form>
  );
}
