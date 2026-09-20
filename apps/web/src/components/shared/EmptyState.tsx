import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, message, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {(description || message) && <p className={styles.description}>{description || message}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
