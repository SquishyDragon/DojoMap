import type { Dojo } from "@/domain/dojo";

import styles from "./dojo-intro.module.css";

type DojoIntroProps = {
  dojo: Dojo;
};

export function DojoIntro({ dojo }: DojoIntroProps) {
  return (
    <header className={styles.intro} id="dojo">
      <p className={styles.brand}>DojoMap</p>

      <div className={styles.identity}>
        <p className={styles.eyebrow}>Your Dojo</p>
        <h1>{dojo.name}</h1>
        <p className={styles.location}>
          {dojo.location.city}, {dojo.location.state}
        </p>
        <p className={styles.description}>{dojo.description}</p>
      </div>

      <a className={styles.pathLink} href="#curriculum">
        <span>Your Path to Black Belt</span>
        <span aria-hidden="true" className={styles.arrow}>
          ↓
        </span>
      </a>
    </header>
  );
}
