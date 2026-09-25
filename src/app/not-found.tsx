import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.main}>
      <header>
        <Link className={styles.brand} href="/" aria-label="DojoMap home">
          DojoMap
        </Link>
      </header>

      <main className={styles.content} aria-labelledby="not-found-title">
        <p className={styles.code}>404 · Path not mapped</p>
        <h1 id="not-found-title">This dojo isn’t on the map.</h1>
        <p className={styles.description}>
          The address may have changed, or this dojo may not be part of the
          DojoMap directory yet.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/dojos">
            Explore mapped dojos <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.secondary} href="/">
            Return to DojoMap
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        Find the path. Know what comes next.
      </footer>
    </div>
  );
}
