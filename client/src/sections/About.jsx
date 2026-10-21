import Section from '../components/ui/Section';
import { about } from '../data/profile';
import styles from './About.module.css';

export default function About() {
  return (
    <Section id="about" title="A bit about me">
      <div className={styles.grid}>
        <div className={styles.text}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <dl className={styles.facts}>
          {about.facts.map(({ label, value }) => (
            <div key={label} className={styles.fact}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
