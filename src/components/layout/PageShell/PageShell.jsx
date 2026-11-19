import styles from './PageShell.module.css'

export default function PageShell({ children }) {
  return (
    <div className={styles.root}>
      <a href="#contenido" className={styles.skip}>
        Saltar al contenido
      </a>
      {children}
    </div>
  )
}
