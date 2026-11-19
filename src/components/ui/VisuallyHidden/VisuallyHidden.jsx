import styles from './VisuallyHidden.module.css'

export default function VisuallyHidden({ as: Tag = 'span', children, ...rest }) {
  return (
    <Tag className={styles.root} {...rest}>
      {children}
    </Tag>
  )
}
