"use client";

import type { Curriculum } from "@/domain/curriculum";
import { getTechniqueContexts } from "@/domain/curriculum";

import { useTechniqueSelection } from "./technique-selection-context";
import styles from "./technique-detail.module.css";

type TechniqueDetailProps = {
  curriculum: Curriculum;
};

export function TechniqueDetail({ curriculum }: TechniqueDetailProps) {
  const { selection } = useTechniqueSelection();

  if (!selection) {
    return null;
  }

  const context = getTechniqueContexts(curriculum, selection.techniqueId).find(
    ({ rank }) => rank.id === selection.rankId,
  );

  if (!context) {
    return null;
  }

  const { technique } = context.item;
  const headingId = `technique-detail-${technique.id}`;

  return (
    <aside aria-labelledby={headingId} className={styles.detail}>
      <p className={styles.label}>Technique detail</p>
      <h2 id={headingId}>{technique.name}</h2>
      <p className={styles.description}>{technique.description}</p>
    </aside>
  );
}
