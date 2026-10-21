import styles from './Monogram.module.css';

/**
 * Initials badge used instead of a photo.
 * `size="lg"` adds the handwritten note and arrow used in the hero.
 */
export default function Monogram({ initials, note, size = 'sm' }) {
  const isLarge = size === 'lg';

  return (
    <div className={`${styles.wrap} ${isLarge ? styles.large : styles.small}`}>
      <span className={styles.badge} aria-hidden="true">
        {initials}
      </span>

      {isLarge && note && (
        <>
          <svg className={styles.arrow} viewBox="0 0 90 60" aria-hidden="true">
            <path d="M84 6 C 60 4, 30 14, 14 44" />
            <path d="M6 34 L 14 46 L 26 38" />
          </svg>
          <p className={styles.note}>{note}</p>
        </>
      )}
    </div>
  );
}
