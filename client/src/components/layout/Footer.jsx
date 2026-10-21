import { person } from '../../data/profile';
import { usePageViews } from '../../hooks/usePageViews';
import styles from './Footer.module.css';

const numberFormat = new Intl.NumberFormat('en-US');

export default function Footer() {
  const pageViews = usePageViews();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {person.fullName}. Built with MongoDB, Express, React and Node.js.
        </p>

        {pageViews !== null && (
          <p className={styles.impressions}>
            <span className={styles.count}>{numberFormat.format(pageViews)}</span> impressions
            served so far
            <span className={styles.aside}>yes, I track my own site too</span>
          </p>
        )}
      </div>
    </footer>
  );
}
