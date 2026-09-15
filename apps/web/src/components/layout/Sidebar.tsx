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
  UserCircle,
  Settings,
  Bot
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRIMARY_NAV = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Practice', href: '/practice', icon: Code2 },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'AI/ML', href: '/ai-ml', icon: BrainCircuit },
  { name: 'System Design', href: '/system-design', icon: Network },
  { name: 'Interview', href: '/interview', icon: MessageSquare },
  { name: 'Career', href: '/career', icon: Briefcase },
  { name: 'Resources', href: '/resources', icon: Library },
  { name: 'Progress', href: '/progress', icon: LineChart },
  { name: 'Mentor', href: '/mentor', icon: Bot },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          Mentorship Platform
        </div>
        
        <nav className={styles.nav}>
          <ul>
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        onClose();
                      }
                    }}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className={styles.footer}>
          <Link href="/settings" className={styles.navItem}>
            <Settings size={20} />
            Settings
          </Link>
          <Link href="/profile" className={styles.navItem}>
            <UserCircle size={20} />
            Profile
          </Link>
        </div>
      </aside>
    </>
  );
}
