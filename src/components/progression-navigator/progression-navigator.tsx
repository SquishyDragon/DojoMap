"use client";

import { useEffect, useState } from "react";

import type { Rank } from "@/domain/curriculum";

import styles from "./progression-navigator.module.css";

type ProgressionNavigatorProps = {
  currentRankId?: string;
  ranks: readonly Rank[];
};

export function ProgressionNavigator({
  currentRankId,
  ranks,
}: ProgressionNavigatorProps) {
  const [visibleRankId, setVisibleRankId] = useState(currentRankId);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-journey-scroll]",
    );
    const sections = [
      document.getElementById("dojo"),
      ...ranks.map((rank) => document.getElementById(rank.id)),
    ].filter((section): section is HTMLElement => section !== null);

    if (!scrollContainer || sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleSection) {
          setVisibleRankId(
            visibleSection.target.id === "dojo"
              ? undefined
              : visibleSection.target.id,
          );
        }
      },
      {
        root: scrollContainer,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ranks]);

  if (ranks.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Belt progression" className={styles.navigator}>
      <ol className={styles.ranks}>
        {ranks.map((rank) => {
          const isCurrent = rank.id === visibleRankId;

          return (
            <li
              aria-current={isCurrent ? "step" : undefined}
              className={styles.rank}
              key={rank.id}
            >
              <span aria-hidden="true" className={styles.marker} />
              <span className={styles.label}>{rank.belt.name}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
