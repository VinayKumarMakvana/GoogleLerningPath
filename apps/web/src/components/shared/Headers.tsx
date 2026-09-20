import React from 'react';
import styles from './Headers.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, subtitle, children }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>
      {(description || subtitle) && <p className={styles.description}>{description || subtitle}</p>}
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
