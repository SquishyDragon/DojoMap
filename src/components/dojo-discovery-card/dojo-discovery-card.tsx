import Link from "next/link";

import type { DojoSearchRecord } from "@/domain/dojo-directory";

import styles from "./dojo-discovery-card.module.css";

export function DojoDiscoveryCard({
  dojo,
  index,
  variant = "directory",
}: {
  dojo: DojoSearchRecord;
  index?: number;
  variant?: "compact" | "directory";
}) {
  return (
    <article className={styles[variant]}>
      {index !== undefined ? (
        <span className={styles.number} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <Link className={styles.link} href={`/${dojo.slug}`}>
        <div className={styles.identity}>
          <p>{dojo.discipline}</p>
          <h2>{dojo.name}</h2>
          <span>{dojo.location}</span>
        </div>
        <p className={styles.summary}>{dojo.summary}</p>
        <span className={styles.action}>
          View curriculum <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
