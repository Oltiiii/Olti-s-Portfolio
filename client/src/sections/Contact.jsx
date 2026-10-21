import ButtonLink from '../components/ui/ButtonLink';
import { person } from '../data/profile';
import { cvUrl } from '../services/api';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={`container ${styles.panel}`}>
        <div className={styles.copy}>
          <h2 id="contact-heading" className={styles.title}>
            Let’s talk.
          </h2>
          <p className={styles.text}>
            Hiring for programmatic, paid media, affiliate or a role where marketing meets code?
            Email is the quickest way to reach me.
          </p>
          <div className={styles.actions}>
            <ButtonLink href={`mailto:${person.email}`}>Email me</ButtonLink>
            <ButtonLink href={cvUrl} download={person.cvFileName} variant="ghost">
              Download CV
            </ButtonLink>
          </div>
        </div>

        <ul className={styles.channels}>
          <li>
            <span className={styles.label}>Email</span>
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </li>
          <li>
            <span className={styles.label}>Phone</span>
            <a href={person.phoneHref}>{person.phone}</a>
          </li>
          <li>
            <span className={styles.label}>LinkedIn</span>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/olti-kryeziu
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
