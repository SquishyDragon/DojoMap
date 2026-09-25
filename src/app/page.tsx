import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>DojoMap</p>
      <h1>Your martial arts journey, mapped.</h1>
      <p className={styles.description}>
        Find your dojo. Explore your curriculum. Know what comes next.
      </p>
    </main>
  );
}
