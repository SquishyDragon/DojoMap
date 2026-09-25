import Link from "next/link";

import styles from "./page.module.css";

const ownerBenefits = [
  {
    number: "01",
    title: "Make the path visible",
    description:
      "Turn rank requirements into a journey students can understand before, during, and after class.",
  },
  {
    number: "02",
    title: "Keep your teaching central",
    description:
      "DojoMap supports your curriculum with clear context. It does not replace instruction, coaching, or dojo culture.",
  },
  {
    number: "03",
    title: "Give your dojo a clear home",
    description:
      "Present your school, training path, and learning resources together in an experience built for martial arts.",
  },
] as const;

export default function ForDojosPage() {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="DojoMap home">
          DojoMap
        </Link>
        <nav aria-label="Owner page navigation">
          <Link href="/#dojo-search">Search Dojo</Link>
          <Link href="/dojos">Explore Dojos</Link>
          <Link aria-current="page" href="/for-dojos">
            I Own a Dojo
          </Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="owner-title">
          <div>
            <p className={styles.eyebrow}>For dojo owners</p>
            <h1 id="owner-title">Give students a path they can see.</h1>
          </div>
          <div className={styles.heroCopy}>
            <p>
              DojoMap helps a school turn its curriculum into a clear
              journey—one that keeps students oriented while preserving the
              role of their instructor and dojo.
            </p>
            <p className={styles.status}>
              <span aria-hidden="true" />
              Dojo onboarding is not open yet.
            </p>
          </div>
        </section>

        <section className={styles.benefits} aria-labelledby="benefits-title">
          <h2 id="benefits-title">What DojoMap is building for schools</h2>
          <div className={styles.benefitGrid}>
            {ownerBenefits.map((benefit) => (
              <article key={benefit.number}>
                <span aria-hidden="true">{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.boundary} aria-label="Current product scope">
          <p>Built with the dojo, not around it.</p>
          <p>
            DojoMap is currently proving the curriculum experience with Fort
            Myers Karate. There is no self-service listing, account, or owner
            dashboard today.
          </p>
        </aside>

        <section className={styles.cta} aria-labelledby="owner-cta-title">
          <div>
            <p>Bring your dojo to DojoMap</p>
            <h2 id="owner-cta-title">Ready when the path opens.</h2>
          </div>
          <div className={styles.ctaAction}>
            <p>
              We are designing a guided owner application so each dojo begins
              with a clear, accurate curriculum—not an empty profile.
            </p>
            <button
              aria-describedby="owner-access-status"
              disabled
              type="button"
            >
              Owner applications — coming soon
            </button>
            <p
              className={styles.ctaStatus}
              id="owner-access-status"
              role="status"
            >
              There is nothing to submit yet. This page will be updated when
              applications open.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
