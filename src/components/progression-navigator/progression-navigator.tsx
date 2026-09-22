import type { Rank } from "@/domain/curriculum";

import styles from "./progression-navigator.module.css";

type ProgressionNavigatorProps = {
  currentRankId?: string;
  ranks: readonly Rank[];
};

export function ProgressionNavigator({
  currentRankId,
  ranks,
}: ProgressionNavigatorProps) {
  if (ranks.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Belt progression" className={styles.navigator}>
      <ol className={styles.ranks}>
        {ranks.map((rank) => {
          const isCurrent = rank.id === currentRankId;

          return (
            <li
              aria-current={isCurrent ? "step" : undefined}
              className={styles.rank}
              key={rank.id}
            >
              <span aria-hidden="true" className={styles.marker} />
              <span className={styles.label}>{rank.belt.name}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
