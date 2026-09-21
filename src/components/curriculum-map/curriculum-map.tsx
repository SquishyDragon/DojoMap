import { RankCard } from "@/components/rank-card/rank-card";
import type { Curriculum } from "@/domain/curriculum";

import styles from "./curriculum-map.module.css";

type CurriculumMapProps = {
  curriculum: Curriculum;
};

export function CurriculumMap({ curriculum }: CurriculumMapProps) {
  return (
    <section
      aria-label={`${curriculum.name} rank progression`}
      className={styles.map}
    >
      <header className={styles.header}>
        <p className={styles.discipline}>{curriculum.discipline}</p>
        <p className={styles.title}>{curriculum.name}</p>
      </header>

      <ol className={styles.ranks}>
        {curriculum.ranks.map((rank, index) => (
          <li className={styles.rank} key={rank.id}>
            <RankCard rank={rank} />
            {index < curriculum.ranks.length - 1 ? (
              <span aria-hidden="true" className={styles.connector} />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
