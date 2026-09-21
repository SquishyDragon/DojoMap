import { CurriculumMap } from "@/components/curriculum-map/curriculum-map";
import { DojoIntro } from "@/components/dojo-intro/dojo-intro";
import { fortMyersKarate } from "@/data/fort-myers-karate";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <DojoIntro dojo={fortMyersKarate} />

      <div id="curriculum">
        <CurriculumMap curriculum={fortMyersKarate.curriculum} />
      </div>
    </main>
  );
}
