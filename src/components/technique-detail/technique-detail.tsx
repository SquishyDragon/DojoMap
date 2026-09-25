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
  const videos = resources.filter(
    (
      resource,
    ): resource is Extract<TechniqueResource, { type: "video" }> =>
      resource.type === "video" && isSafeExternalUrl(resource.url),
  );

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className={styles.resources}>
      <h3>Resources</h3>
      <ul>
        {videos.map((video) => (
          <li key={`${video.type}-${video.url}`}>
            <a
              aria-label={`${video.label} (video, opens in new tab)`}
              href={video.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.resourceType}>Video</span>
              <span>{video.label}</span>
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
