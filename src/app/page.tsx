import { CurriculumMap } from "@/components/curriculum-map/curriculum-map";
import { DojoIntro } from "@/components/dojo-intro/dojo-intro";
import { ProgressionNavigator } from "@/components/progression-navigator/progression-navigator";
import { fortMyersKarate } from "@/data/fort-myers-karate";

import styles from "./page.module.css";

export default function Home() {
  const { curriculum } = fortMyersKarate;

  return (
    <main className={styles.main} data-journey-scroll>
      <DojoIntro dojo={fortMyersKarate} />
      <ProgressionNavigator ranks={curriculum.ranks} />

      <div id="curriculum">
        <CurriculumMap curriculum={curriculum} />
      </div>
    </main>
  );
}
