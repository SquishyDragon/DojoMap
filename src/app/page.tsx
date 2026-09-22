"use client";

import { useState, type UIEvent } from "react";

import { CurriculumMap } from "@/components/curriculum-map/curriculum-map";
import { DojoIntro } from "@/components/dojo-intro/dojo-intro";
import { ProgressionNavigator } from "@/components/progression-navigator/progression-navigator";
import { fortMyersKarate } from "@/data/fort-myers-karate";

import styles from "./page.module.css";

export default function Home() {
  const { curriculum } = fortMyersKarate;
  const [currentRankId, setCurrentRankId] = useState<string | undefined>(
    curriculum.ranks[0]?.id,
  );

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const scrollContainer = event.currentTarget;
    const containerBounds = scrollContainer.getBoundingClientRect();
    const viewportCenter = containerBounds.top + scrollContainer.clientHeight / 2;
    const sections = Array.from(
      scrollContainer.querySelectorAll<HTMLElement>("[data-journey-section]"),
    );
    const centeredSection = sections.reduce((closest, section) => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);

      return distance < closest.distance ? { distance, section } : closest;
    }, { distance: Number.POSITIVE_INFINITY, section: sections[0] });

    setCurrentRankId(centeredSection.section.dataset.rankId);
  };

  return (
    <main className={styles.main} data-journey-scroll onScroll={handleScroll}>
      <DojoIntro dojo={fortMyersKarate} />
      <ProgressionNavigator
        currentRankId={currentRankId}
        ranks={curriculum.ranks}
      />

      <div id="curriculum">
        <CurriculumMap curriculum={curriculum} />
      </div>
    </main>
  );
}
