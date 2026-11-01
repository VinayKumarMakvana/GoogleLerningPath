"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  Search, 
  Bell, 
  Flame, 
  Target, 
  Command, 
  User, 
  Settings, 
  Briefcase, 
  Activity, 
  LogOut,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import styles from './TopBar.module.css';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (streakRef.current && !streakRef.current.contains(e.target as Node)) {
        setStreakOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; Max-Age=0; path=/;';
      window.location.href = '/login';
    }
  };

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.leftSection}>
          <button 
            className={styles.mobileMenuToggle} 
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation"
          >
            <Menu size={20} />
          </button>
          
          <div 
            className={styles.searchContainer} 
            onClick={() => setPaletteOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search problems, patterns, system designs... (⌘K)" 
              className={styles.searchInput}
              aria-label="Global Search"
              readOnly
            />
            <div className={styles.kbdShortcut}>
              <Command size={11} />
              <span>K</span>
            </div>
          </div>
        </div>
        
        <div className={styles.rightSection}>
          {/* Streak Pill */}
          <div className={styles.menuContainer} ref={streakRef}>
            <div 
              className={styles.metricPill} 
              title="Click to view daily study streak"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setStreakOpen(!streakOpen);
                setNotifOpen(false);
                setProfileOpen(false);
              }}
            >
              <Flame size={15} className={styles.flameIcon} />
              <span className={styles.metricNumber}>14</span>
              <span className={styles.metricLabel}>Day Streak</span>
            </div>

            {streakOpen && (
              <div className={`${styles.dropdownPopover} ${styles.streakDropdown}`}>
                <div className={styles.streakTop}>
                  <Flame size={24} color="#f59e0b" />
                  <div>
                    <span className={styles.streakDaysNum}>14 Days</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Consecutive Activity</span>
                  </div>
                </div>
                <p className={styles.streakDesc}>
                  You are in the <strong style={{ color: '#fff' }}>top 5% of active candidates</strong> preparing for Google L5.
                </p>
                <div className={styles.streakBadgeRow}>
                  <span>29 Problems Solved</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>88% Accuracy</span>
                </div>
              </div>
            )}
          </div>

          {/* Readiness Pill (Direct Link to /interview) */}
          <Link href="/interview" style={{ textDecoration: 'none' }}>
            <div className={styles.readinessPill} title="Estimated Google L5 interview readiness">
              <Target size={15} className={styles.targetIcon} />
              <span className={styles.readinessScore}>84%</span>
              <span className={styles.readinessLabel}>Interview Ready</span>
            </div>
          </Link>

          {/* Notifications Dropdown */}
          <div className={styles.menuContainer} ref={notifRef}>
            <button 
              className={styles.iconButton} 
              aria-label="Notifications"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
                setStreakOpen(false);
              }}
            >
              <Bell size={18} />
              {hasUnread && <span className={styles.notificationDot} />}
            </button>

            {notifOpen && (
              <div className={`${styles.dropdownPopover} ${styles.notifDropdown}`}>
                <div className={styles.notifHeader}>
                  <span className={styles.notifTitle}>Notifications</span>
                  {hasUnread && (
                    <button 
                      className={styles.markReadBtn}
                      onClick={() => setHasUnread(false)}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className={styles.notifList}>
                  <div className={styles.notifItem} onClick={() => { setNotifOpen(false); router.push('/career'); }}>
                    <div className={styles.notifDot} style={{ background: '#0070f3' }} />
                    <div className={styles.notifText}>
                      <span className={styles.notifMsg}>Google Onsite Round 3: System Design & Architecture is scheduled.</span>
                      <span className={styles.notifTime}>2 hours ago</span>
                    </div>
                  </div>

                  <div className={styles.notifItem} onClick={() => { setNotifOpen(false); router.push('/practice'); }}>
                    <div className={styles.notifDot} style={{ background: '#10b981' }} />
                    <div className={styles.notifText}>
                      <span className={styles.notifMsg}>14-Day Streak Unlocked! Keep practicing daily to maintain velocity.</span>
                      <span className={styles.notifTime}>Today</span>
                    </div>
                  </div>

                  <div className={styles.notifItem} onClick={() => { setNotifOpen(false); router.push('/assessments'); }}>
                    <div className={styles.notifDot} style={{ background: '#f59e0b' }} />
                    <div className={styles.notifText}>
                      <span className={styles.notifMsg}>Assessment A6 (Google Mixed Proctored Exam) recommended.</span>
                      <span className={styles.notifTime}>Yesterday</span>
                    </div>
                  </div>

                  <div className={styles.notifItem} onClick={() => { setNotifOpen(false); router.push('/system-design'); }}>
                    <div className={styles.notifDot} style={{ background: '#a855f7' }} />
                    <div className={styles.notifText}>
                      <span className={styles.notifMsg}>Distributed Caching & Rate Limiter modules updated with FAANG notes.</span>
                      <span className={styles.notifTime}>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu Dropdown */}
          <div className={styles.menuContainer} ref={profileRef}>
            <div 
              className={styles.avatar} 
              title="Candidate Menu"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
                setStreakOpen(false);
              }}
            >
              <span>VM</span>
            </div>

            {profileOpen && (
              <div className={`${styles.dropdownPopover} ${styles.profileDropdown}`}>
                <div className={styles.profileCardTop}>
                  <span className={styles.profileName}>Vinay Makvana</span>
                  <span className={styles.profileEmail}>demo@google.com</span>
                  <span className={styles.profileTargetBadge}>Google SWE L5</span>
                </div>

                <div className={styles.menuList}>
                  <Link 
                    href="/profile" 
                    className={styles.menuLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    <User size={16} /> Professional Profile
                  </Link>

                  <Link 
                    href="/career" 
                    className={styles.menuLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    <Briefcase size={16} /> Career & Placement Pipeline
                  </Link>

                  <Link 
                    href="/progress" 
                    className={styles.menuLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    <Activity size={16} /> Progress Intelligence
                  </Link>

                  <Link 
                    href="/settings" 
                    className={styles.menuLink}
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings size={16} /> Account Settings
                  </Link>

                  <div className={styles.menuDivider} />

                  <button 
                    className={styles.signOutBtn}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)} 
      />
    </>
  );
}
