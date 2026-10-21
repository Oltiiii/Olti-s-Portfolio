import ButtonLink from '../components/ui/ButtonLink';
import Monogram from '../components/ui/Monogram';
import { hero, person } from '../data/profile';
import { cvUrl } from '../services/api';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.greeting}>{hero.greeting}</p>
          <h1 id="hero-heading" className={styles.headline}>
            {hero.headline}
          </h1>
          <p className={styles.intro}>{hero.intro}</p>

          <div className={styles.actions}>
            <ButtonLink href={cvUrl} download={person.cvFileName}>
              Download my CV
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>

          <p className={styles.meta}>
            <span className={styles.statusDot} aria-hidden="true" />
            {person.status}, based in {person.location}
          </p>
        </div>

        <div className={styles.art}>
          <Monogram initials={person.initials} note={hero.monogramNote} size="lg" />
        </div>
      </div>
    </section>
  );
}
