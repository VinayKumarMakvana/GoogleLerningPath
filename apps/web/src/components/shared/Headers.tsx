import React from 'react';
import styles from './Headers.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}
