import Link from "next/link";

import { DojoDiscoveryCard } from "@/components/dojo-discovery-card/dojo-discovery-card";
import { dojoDirectory } from "@/data/dojo-directory";
import { toDojoSearchRecord } from "@/domain/dojo-directory";

import styles from "./page.module.css";

export default function DojosPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          DojoMap
        </Link>
        <nav aria-label="Directory navigation">
          <Link href="/#dojo-search">Search Dojo</Link>
          <Link aria-current="page" href="/dojos">
            Explore Dojos
          </Link>
          <Link href="/for-dojos">I Own a Dojo</Link>
        </nav>
      </header>

      <section className={styles.intro} aria-labelledby="directory-title">
        <p>Dojo directory</p>
        <h1 id="directory-title">Find a path worth following.</h1>
        <div className={styles.introMeta}>
          <p>
            Explore the dojos currently mapped on DojoMap. Each listing opens
            its curriculum journey, so you can understand where training leads.
          </p>
          <span>
            {dojoDirectory.length} {dojoDirectory.length === 1 ? "dojo" : "dojos"} mapped
          </span>
        </div>
      </section>

      <section className={styles.directory} aria-label="Available dojos">
        {dojoDirectory.map((entry, index) => (
          <DojoDiscoveryCard
            dojo={toDojoSearchRecord(entry)}
            index={index}
            key={entry.dojo.id}
          />
        ))}
      </section>
    </main>
  );
}
