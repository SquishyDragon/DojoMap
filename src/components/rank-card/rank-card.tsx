import type { Rank } from "@/domain/curriculum";

import styles from "./rank-card.module.css";

type RankCardProps = {
  rank: Rank;
};

export function RankCard({ rank }: RankCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <p className={styles.position}>Rank {rank.order}</p>
        <h2>{rank.name}</h2>
      </div>

      <div className={styles.belt}>
        <span
          aria-hidden="true"
          className={styles.beltColor}
          style={{ backgroundColor: rank.belt.color }}
        />
        <span>{rank.belt.name} belt</span>
      </div>

      <div className={styles.requirements}>
        <p className={styles.requirementsLabel}>Requirements</p>
        {rank.requirements.map((requirement) => (
          <div className={styles.category} key={requirement.id}>
            <h3>{requirement.category}</h3>
            <ul className={styles.items}>
              {requirement.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
