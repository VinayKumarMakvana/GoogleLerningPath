import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import styles from './TopBar.module.css';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        <button 
          className={styles.mobileMenuToggle} 
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <Menu size={24} />
        </button>
        
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search topics, resources, notes..." 
            className={styles.searchInput}
            aria-label="Global Search"
          />
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className={styles.avatar}>
          U
        </div>
      </div>
    </header>
  );
}
