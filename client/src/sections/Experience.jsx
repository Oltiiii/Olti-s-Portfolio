import Section from '../components/ui/Section';
import TagList from '../components/ui/TagList';
import { experience } from '../data/profile';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <Section id="experience" title="Where I’ve worked">
      <ol className={styles.timeline}>
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className={styles.item}>
            <p className={styles.period}>{job.period}</p>

            <div className={styles.body}>
              <h3 className={styles.role}>
                {job.role} <span className={styles.company}>at {job.company}</span>
              </h3>

              <ul className={styles.highlights}>
                {job.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 32)}>{highlight}</li>
                ))}
              </ul>

              <TagList items={job.tools} label={`Tools used at ${job.company}`} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
