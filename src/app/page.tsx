import Link from "next/link";

import { DojoSearch } from "@/components/dojo-search/dojo-search";
import { dojoDirectory } from "@/data/dojo-directory";
import { toDojoSearchRecord } from "@/domain/dojo-directory";

import styles from "./page.module.css";

export default function HomePage() {
  const searchEntries = dojoDirectory.map(toDojoSearchRecord);

  return (
    <div className={styles.main}>
      <div className={styles.image} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="DojoMap home">
          DojoMap
        </Link>
        <nav aria-label="Primary navigation" className={styles.navigation}>
          <a href="#dojo-search">Search Dojo</a>
          <Link href="/dojos">Explore Dojos</Link>
          <Link href="/for-dojos">I Own a Dojo</Link>
        </nav>
      </header>

      <main className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.eyebrow}>Discipline lives here</p>
        <h1 id="hero-title">
          Your martial arts journey, <em>mapped.</em>
        </h1>
        <p className={styles.description}>
          Find your dojo. Explore your curriculum. Know what comes next.
        </p>

        <DojoSearch entries={searchEntries} />
      </main>

      <footer className={styles.principles}>
        <span>People</span>
        <span>Progress</span>
        <span>Community</span>
      </footer>
    </div>
  );
}
