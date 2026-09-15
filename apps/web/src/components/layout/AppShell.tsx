"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.appShell}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className={styles.mainContent}>
        <TopBar onToggleSidebar={toggleSidebar} />
        
        <main className={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}
