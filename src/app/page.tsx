"use client";

import { useEffect, useRef, useState, type UIEvent } from "react";

import { CurriculumMap } from "@/components/curriculum-map/curriculum-map";
import { DojoIntro } from "@/components/dojo-intro/dojo-intro";
import { ProgressionNavigator } from "@/components/progression-navigator/progression-navigator";
import { fortMyersKarate } from "@/data/fort-myers-karate";

import styles from "./page.module.css";

function getJourneySections(scrollContainer: HTMLElement) {
  return Array.from(
    scrollContainer.querySelectorAll<HTMLElement>("[data-journey-section]"),
  );
}

function getCenteredSection(scrollContainer: HTMLElement) {
  const containerBounds = scrollContainer.getBoundingClientRect();
  const viewportCenter = containerBounds.top + scrollContainer.clientHeight / 2;
  const sections = getJourneySections(scrollContainer);

  return sections.reduce((closest, section) => {
    const bounds = section.getBoundingClientRect();
    const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);

    return distance < closest.distance ? { distance, section } : closest;
  }, { distance: Number.POSITIVE_INFINITY, section: sections[0] }).section;
}

export default function Home() {
  const { curriculum } = fortMyersKarate;
  const journeyRef = useRef<HTMLElement>(null);
  const [currentRankId, setCurrentRankId] = useState<string | undefined>(
    curriculum.ranks[0]?.id,
  );

  useEffect(() => {
    const handleKeyboardNavigation = (event: KeyboardEvent) => {
      const direction =
        event.key === "ArrowDown" || event.key === "PageDown"
          ? 1
          : event.key === "ArrowUp" || event.key === "PageUp"
            ? -1
            : 0;
      const target = event.target as HTMLElement | null;
      const isEditing =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "SELECT" ||
        target?.tagName === "TEXTAREA";

      if (
        direction === 0 ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditing
      ) {
        return;
      }

      const scrollContainer = journeyRef.current;

      if (!scrollContainer) {
        return;
      }

      const sections = getJourneySections(scrollContainer);
      const currentIndex = sections.indexOf(getCenteredSection(scrollContainer));
      const destinationIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1,
      );

      if (destinationIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      sections[destinationIndex].scrollIntoView({ block: "start" });
    };

    window.addEventListener("keydown", handleKeyboardNavigation);

    return () => window.removeEventListener("keydown", handleKeyboardNavigation);
  }, []);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const scrollContainer = event.currentTarget;
    const centeredSection = getCenteredSection(scrollContainer);

    setCurrentRankId(centeredSection.dataset.rankId);
  };

  return (
    <main
      className={styles.main}
      data-journey-scroll
      onScroll={handleScroll}
      ref={journeyRef}
    >
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
