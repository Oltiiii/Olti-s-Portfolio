import Section from '../components/ui/Section';
import TagList from '../components/ui/TagList';
import { projects } from '../data/profile';
import styles from './Work.module.css';

export default function Work() {
  return (
    <Section
      id="work"
      title="What I’ve built"
      intro="Most of my campaign work belongs to clients, so here is the build I can show."
    >
      <div className={styles.list}>
        {projects.map((project) => (
          <article key={project.name} className={styles.project}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.summary}>{project.summary}</p>
            <TagList items={project.tags} label={`Technologies used for ${project.name}`} />
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {project.linkLabel}
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
