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
        {curriculum.ranks.map((rank) => (
          <li key={rank.id}>
            <RankCard rank={rank} />
          </li>
        ))}
      </ol>
    </section>
  );
}
