type EmptyStateProps = {
  title: string
  description: string
  supportText?: string
  className?: string
}

export function EmptyState({
  title,
  description,
  supportText,
  className = '',
}: EmptyStateProps) {
  const classes = ['empty-state', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__description">{description}</p>
      {supportText ? <span className="empty-state__support">{supportText}</span> : null}
    </section>
  )
}
