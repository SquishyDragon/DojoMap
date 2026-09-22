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
        <ol className={styles.ranks}>
          {curriculum.ranks.map((rank, index) => (
            <li
              className={styles.rank}
              id={rank.id}
              key={rank.id}
              style={{ "--belt-color": rank.belt.color } as CSSProperties}
            >
              {index === 0 ? (
                <CurriculumHeader curriculum={curriculum} />
              ) : null}
              <RankCard rank={rank} />
              {index < curriculum.ranks.length - 1 ? (
                <span aria-hidden="true" className={styles.connector} />
              ) : null}
            </li>
          ))}
        </ol>
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
