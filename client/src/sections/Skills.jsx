import Section from '../components/ui/Section';
import TagList from '../components/ui/TagList';
import { skillGroups } from '../data/profile';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <Section id="skills" title="What I work with">
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.title}>{group.title}</h3>
            <TagList items={group.skills} label={group.title} />
          </div>
        ))}
      </div>
    </Section>
  );
}
