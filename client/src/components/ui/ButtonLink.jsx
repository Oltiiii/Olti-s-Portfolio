import styles from './Button.module.css';

/** A link styled as a button. External links open in a new tab safely. */
export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  compact = false,
  external = false,
  download,
}) {
  const className = [styles.button, styles[variant], compact && styles.compact]
    .filter(Boolean)
    .join(' ');
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={className} download={download} {...externalProps}>
      {children}
    </a>
  );
}
