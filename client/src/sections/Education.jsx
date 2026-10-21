import Section from '../components/ui/Section';
import { certificates, education } from '../data/profile';
import styles from './Education.module.css';

/** @param {{ heading: string, items: Array<{ title: string, detail: string, period: string }> }} props */
function EntryList({ heading, items }) {
  return (
    <div className={styles.column}>
      <h3 className={styles.heading}>{heading}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.title} className={styles.entry}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.detail}>{item.detail}</p>
            <p className={styles.period}>{item.period}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  return (
    <Section id="education" title="Education and certificates">
      <div className={styles.grid}>
        <EntryList heading="Education" items={education} />
        <EntryList heading="Certificates" items={certificates} />
      </div>
    </Section>
  );
}
