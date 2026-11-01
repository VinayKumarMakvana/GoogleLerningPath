"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Code2, 
  FolderGit2, 
  BrainCircuit, 
  Network, 
  MessageSquare, 
  Briefcase, 
  Library, 
  LineChart, 
  Settings, 
  Bot, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'CORE PREPARATION',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Roadmap', href: '/roadmap', icon: Map, badge: 'Target' },
      { name: 'Curriculum', href: '/learn', icon: BookOpen },
      { name: 'DSA Practice', href: '/practice', icon: Code2, badge: 'Active' },
    ]
  },
  {
    title: 'SPECIALIZATIONS',
    items: [
      { name: 'System Design', href: '/system-design', icon: Network },
      { name: 'AI / ML Track', href: '/ai-ml', icon: BrainCircuit },
      { name: 'Production Projects', href: '/projects', icon: FolderGit2 },
    ]
  },
  {
    title: 'INTERVIEW READINESS',
    items: [
      { name: 'Assessments', href: '/assessments', icon: Award },
      { name: 'AI Mock Interview', href: '/interview', icon: MessageSquare },
      { name: 'AI Mentor Assistant', href: '/mentor', icon: Bot, highlight: true },
      { name: 'Progress & Weakness', href: '/progress', icon: LineChart },
      { name: 'Career Pipeline', href: '/career', icon: Briefcase },
      { name: 'Engineering Notes', href: '/resources', icon: Library },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Brand Header */}
        <div className={styles.brand}>
          <div className={styles.logoBadge}>
            <Sparkles size={18} className={styles.logoIcon} />
          </div>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>Google SWE</span>
            <span className={styles.brandTier}>PREP PLATFORM</span>
          </div>
          <span className={styles.statusPill}>PRO</span>
        </div>
        
        {/* Nav Items */}
        <nav className={styles.nav}>
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <div className={styles.groupTitle}>{group.title}</div>
              <ul className={styles.groupList}>
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}`));
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} ${item.highlight ? styles.navItemHighlight : ''}`}
                        onClick={handleLinkClick}
                      >
                        <div className={styles.itemLeft}>
                          <Icon size={18} className={styles.itemIcon} />
                          <span className={styles.itemLabel}>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`${styles.itemBadge} ${isActive ? styles.itemBadgeActive : ''}`}>
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight size={14} className={styles.activeChevron} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer / User Profile Card */}
        <div className={styles.footer}>
          <Link href="/profile" className={styles.userProfileCard}>
            <div className={styles.userAvatar}>
              <span>VM</span>
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Vinay Makvana</span>
              <span className={styles.userRole}>Google SWE L5</span>
            </div>
            <span className={styles.settingsBtn} aria-label="Settings">
              <Settings size={17} />
            </span>
          </Link>
        </div>

      </aside>
    </>
  );
}
