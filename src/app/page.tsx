import { CurriculumMap } from "@/components/curriculum-map/curriculum-map";
import { karateCurriculum } from "@/data/karate-curriculum";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.intro}>
        <h1>DojoMap</h1>
        <p>A clear path through your martial arts curriculum.</p>
      </header>

      <CurriculumMap curriculum={karateCurriculum} />
    </main>
  );
}
