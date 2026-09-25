"use client";

import type { CSSProperties } from "react";

import type { Curriculum, TechniqueResource } from "@/domain/curriculum";
import { getTechniqueContexts } from "@/domain/curriculum";

import { useTechniqueSelection } from "./technique-selection-context";
import styles from "./technique-detail.module.css";

type TechniqueDetailProps = {
  curriculum: Curriculum;
};

function isSafeExternalUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function TechniqueResources({
  resources,
}: {
  resources: readonly TechniqueResource[];
}) {
  const linkedResources = resources.filter(
    (
      resource,
    ): resource is Extract<
      TechniqueResource,
      { type: "video" | "article" }
    > =>
      (resource.type === "video" || resource.type === "article") &&
      isSafeExternalUrl(resource.url),
  );

  if (linkedResources.length === 0) {
    return null;
  }

  return (
    <div className={styles.resources}>
      <h3>Resources</h3>
      <ul>
        {linkedResources.map((resource) => (
          <li key={`${resource.type}-${resource.url}`}>
            <a
              aria-label={`${resource.label} (${resource.type}, opens in new tab)`}
              href={resource.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.resourceType}>
                {resource.type === "video" ? "Video" : "Article"}
              </span>
              <span>{resource.label}</span>
              <span aria-hidden="true" className={styles.resourceIcon}>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechniqueDetail({ curriculum }: TechniqueDetailProps) {
  const { clearTechnique, selection } = useTechniqueSelection();

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
    <aside
      aria-labelledby={headingId}
      className={styles.detail}
      style={{ "--belt-color": context.rank.belt.color } as CSSProperties}
    >
      <button
        aria-label="Close technique details"
        className={styles.closeButton}
        onClick={clearTechnique}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
      <p className={styles.label}>Technique detail</p>
      <h2 id={headingId}>{technique.name}</h2>
      <div className={styles.rankContext}>
        <span aria-hidden="true" className={styles.beltColor} />
        <span>{context.rank.name}</span>
      </div>
      <p className={styles.description}>{technique.description}</p>
      <TechniqueResources resources={technique.resources} />
    </aside>
  );
}
