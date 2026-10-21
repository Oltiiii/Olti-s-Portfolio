import { useState } from 'react';
import { navLinks, person } from '../../data/profile';
import { cvUrl } from '../../services/api';
import ButtonLink from '../ui/ButtonLink';
import Monogram from '../ui/Monogram';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.bar}>
      <nav className={`container ${styles.nav}`} aria-label="Main">
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <Monogram initials={person.initials} />
          <span>{person.fullName}</span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="nav-links"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>

        <div id="nav-links" className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.list}>
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={cvUrl} download={person.cvFileName} compact>
            Download CV
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
