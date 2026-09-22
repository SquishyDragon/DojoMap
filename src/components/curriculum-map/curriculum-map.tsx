import type { CSSProperties } from "react";

import { RankCard } from "@/components/rank-card/rank-card";
import type { Curriculum } from "@/domain/curriculum";

import styles from "./curriculum-map.module.css";

type CurriculumMapProps = {
  curriculum?: Curriculum | null;
};

export function CurriculumMap({ curriculum }: CurriculumMapProps) {
  if (!curriculum) {
    return (
      <section aria-label="Curriculum status" className={styles.map}>
        <div className={styles.emptySection}>
          <CurriculumStatus
            description="Curriculum data could not be loaded."
            label="Curriculum unavailable"
            title="Nothing to map yet"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={`${curriculum.name} rank progression`}
      className={styles.map}
    >
      {curriculum.ranks.length === 0 ? (
        <div className={styles.emptySection}>
          <CurriculumHeader curriculum={curriculum} />
          <CurriculumStatus
            description="This curriculum does not have any ranks to display."
            label="Curriculum empty"
            title="No ranks yet"
          />
        </div>
      ) : (
        <>
          <ol className={styles.ranks}>
            {curriculum.ranks.map((rank, index) => (
              <li
                className={styles.rank}
                data-journey-section
                data-rank-id={rank.id}
                id={rank.id}
                key={rank.id}
                style={{ "--belt-color": rank.belt.color } as CSSProperties}
              >
                {index === 0 ? (
                  <CurriculumHeader curriculum={curriculum} />
                ) : null}
                <div className={styles.rankContent}>
                  <RankCard rank={rank} />
                </div>
                <span aria-hidden="true" className={styles.connector} />
              </li>
            ))}
          </ol>
          <section
            aria-labelledby="path-mapped-title"
            className={styles.conclusionSection}
            data-journey-section
            data-rank-id={curriculum.ranks.at(-1)?.id}
            id="path-mapped"
            style={
              {
                "--belt-color": curriculum.ranks.at(-1)?.belt.color,
              } as CSSProperties
            }
          >
            <div className={styles.conclusion}>
              <span aria-hidden="true" className={styles.conclusionMark}>
                ★
              </span>
              <div>
                <p className={styles.conclusionLabel}>Current map complete</p>
                <h2 className={styles.conclusionTitle} id="path-mapped-title">
                  The journey continues
                </h2>
                <p className={styles.conclusionDescription}>
                  This map ends here, but training does not. It is a guide to
                  the current curriculum—not a record of every lesson,
                  milestone, or degree ahead.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}

type CurriculumHeaderProps = {
  curriculum: Curriculum;
};

function CurriculumHeader({ curriculum }: CurriculumHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.discipline}>{curriculum.discipline}</p>
      <p className={styles.title}>{curriculum.name}</p>
    </header>
  );
}

type CurriculumStatusProps = {
  description: string;
  label: string;
  title: string;
};

function CurriculumStatus({
  description,
  label,
  title,
}: CurriculumStatusProps) {
  return (
    <div className={styles.emptyState} role="status">
      <p className={styles.statusLabel}>{label}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
