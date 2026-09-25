import {
  getCurriculumItemId,
  getCurriculumItemName,
  type Rank,
} from "@/domain/curriculum";
import { useTechniqueSelection } from "@/components/technique-detail/technique-selection-context";

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
  const headingId = `${rank.id}-title`;
  const { selectTechnique } = useTechniqueSelection();

  return (
    <article aria-labelledby={headingId} className={styles.card}>
      <div className={styles.heading}>
        <p className={styles.position}>Rank {rank.order}</p>
        <h2 id={headingId}>{rank.name}</h2>
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
                const itemId = getCurriculumItemId(item);
                const itemName = getCurriculumItemName(item);
                const hasDestination = hasAvailableExternalResource(
                  item.resource,
                );
                const canSelectTechnique =
                  item.type === "technique" && !hasDestination;

                return (
                  <li
                    className={
                      hasDestination || canSelectTechnique
                        ? styles.resourceItem
                        : undefined
                    }
                    key={itemId}
                  >
                    {hasDestination && item.resource?.type === "external" ? (
                      <a
                        aria-label={`${itemName} (opens in new tab)`}
                        className={styles.resourceLink}
                        href={item.resource.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>{itemName}</span>
                        <span
                          aria-hidden="true"
                          className={styles.resourceIcon}
                        >
                          ↗
                        </span>
                      </a>
                    ) : canSelectTechnique && item.type === "technique" ? (
                      <button
                        className={styles.techniqueButton}
                        onClick={(event) =>
                          selectTechnique(
                            {
                              techniqueId: item.technique.id,
                              rankId: rank.id,
                            },
                            event.currentTarget,
                          )
                        }
                        type="button"
                      >
                        <span>{itemName}</span>
                        <span
                          aria-hidden="true"
                          className={styles.techniqueIcon}
                        >
                          ›
                        </span>
                      </button>
                    ) : (
                      <span>{itemName}</span>
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
