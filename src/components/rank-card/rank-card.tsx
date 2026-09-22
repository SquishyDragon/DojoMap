import type { Rank } from "@/domain/curriculum";

import styles from "./rank-card.module.css";

type RankCardProps = {
  rank: Rank;
};

function hasAvailableExternalResource(
  resource: Rank["requirements"][number]["items"][number]["resource"],
) {
  if (resource?.type !== "external") {
    return false;
  }

  try {
    const url = new URL(resource.url);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

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
              {requirement.items.map((item) => {
                const hasDestination = hasAvailableExternalResource(
                  item.resource,
                );

                return (
                  <li
                    className={hasDestination ? styles.resourceItem : undefined}
                    key={item.id}
                  >
                    {hasDestination && item.resource?.type === "external" ? (
                      <a
                        aria-label={`${item.name} (opens in new tab)`}
                        className={styles.resourceLink}
                        href={item.resource.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>{item.name}</span>
                        <span
                          aria-hidden="true"
                          className={styles.resourceIcon}
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
