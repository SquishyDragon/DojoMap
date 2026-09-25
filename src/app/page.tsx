import Link from "next/link";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
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

      <section className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.eyebrow}>Discipline lives here</p>
        <h1 id="hero-title">
          Your martial arts journey, <em>mapped.</em>
        </h1>
        <p className={styles.description}>
          Find your dojo. Explore your curriculum. Know what comes next.
        </p>

        <div className={styles.search} role="search">
          <label htmlFor="dojo-search">Search for your dojo</label>
          <div className={styles.searchControl}>
            <span className={styles.searchIcon} aria-hidden="true" />
            <input
              id="dojo-search"
              name="dojo"
              placeholder="Search by dojo or city"
              type="search"
            />
            <button
              aria-label="Dojo search is coming in the next step"
              disabled
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <p className={styles.principles}>
        <span>People</span>
        <span>Progress</span>
        <span>Community</span>
      </p>
    </main>
  );
}
