import Link from "next/link";

import { dojoDirectory } from "@/data/dojo-directory";

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
        {dojoDirectory.map(({ slug, dojo }, index) => (
          <article className={styles.dojo} key={dojo.id}>
            <div className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className={styles.identity}>
              <p>{dojo.curriculum.discipline}</p>
              <h2>{dojo.name}</h2>
              <span>
                {dojo.location.city}, {dojo.location.state}
              </span>
            </div>
            <p className={styles.summary}>{dojo.description}</p>
            <Link className={styles.action} href={`/${slug}`}>
              View curriculum <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
