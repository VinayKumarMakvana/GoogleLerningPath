'use client';

import React, { useState } from 'react';
import { Bell, Shield, Palette, LogOut, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

const SECTIONS = [
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('notifications');

  // Notification prefs stored locally
  const [notifPrefs, setNotifPrefs] = useState({
    dailyReminder: true,
    weeklyReport: true,
    practiceReminder: false,
    achievementAlerts: true,
  });

  // Appearance
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

  const toggle = (key: keyof typeof notifPrefs) => {
    setNotifPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; Max-Age=0; path=/;';
      window.location.href = '/login';
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account preferences.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`${styles.sidebarItem} ${activeSection === key ? styles.sidebarItemActive : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <Icon size={16} />
              <span>{label}</span>
              <ChevronRight size={14} className={styles.chevron} />
            </button>
          ))}
          <div className={styles.divider} />
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Content Panel */}
        <div className={styles.panel}>
          {activeSection === 'notifications' && (
            <div className={styles.panelContent}>
              <h2 className={styles.panelTitle}>Notification Preferences</h2>
              <p className={styles.panelDesc}>Choose which updates you want to receive.</p>
              <div className={styles.toggleList}>
                <ToggleRow
                  label="Daily Study Reminder"
                  description="Get a daily nudge to stick to your study plan."
                  checked={notifPrefs.dailyReminder}
                  onChange={() => toggle('dailyReminder')}
                />
                <ToggleRow
                  label="Weekly Progress Report"
                  description="A summary of your progress sent every Monday."
                  checked={notifPrefs.weeklyReport}
                  onChange={() => toggle('weeklyReport')}
                />
                <ToggleRow
                  label="Practice Problem Reminders"
                  description="Reminders to practice when you haven't in 2+ days."
                  checked={notifPrefs.practiceReminder}
                  onChange={() => toggle('practiceReminder')}
                />
                <ToggleRow
                  label="Achievement Alerts"
                  description="Be notified when you reach milestones or earn badges."
                  checked={notifPrefs.achievementAlerts}
                  onChange={() => toggle('achievementAlerts')}
                />
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className={styles.panelContent}>
              <h2 className={styles.panelTitle}>Security</h2>
              <p className={styles.panelDesc}>Manage your password and account security.</p>
              <div className={styles.securityCard}>
                <div>
                  <div className={styles.securityLabel}>Password</div>
                  <div className={styles.securitySub}>Last changed: Unknown</div>
                </div>
                <button className={styles.outlineBtn}>Change Password</button>
              </div>
              <div className={styles.securityCard}>
                <div>
                  <div className={styles.securityLabel}>Two-Factor Authentication</div>
                  <div className={styles.securitySub}>Add an extra layer of security to your account.</div>
                </div>
                <button className={styles.outlineBtn} disabled title="Coming soon">
                  Enable 2FA
                </button>
              </div>
              <div className={styles.dangerZone}>
                <div className={styles.dangerTitle}>Danger Zone</div>
                <div className={styles.securityCard} style={{ borderColor: '#fca5a5' }}>
                  <div>
                    <div className={styles.securityLabel}>Delete Account</div>
                    <div className={styles.securitySub}>This action is permanent and cannot be undone.</div>
                  </div>
                  <button className={styles.dangerBtn} disabled title="Coming soon">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className={styles.panelContent}>
              <h2 className={styles.panelTitle}>Appearance</h2>
              <p className={styles.panelDesc}>Customise how DevMastery looks for you.</p>
              <div className={styles.themeGrid}>
                {(['light', 'system', 'dark'] as const).map((t) => (
                  <button
                    key={t}
                    className={`${styles.themeOption} ${theme === t ? styles.themeOptionActive : ''}`}
                    onClick={() => setTheme(t)}
                  >
                    <div className={`${styles.themePreview} ${styles[`preview_${t}`]}`} />
                    <span className={styles.themeLabel}>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                  </button>
                ))}
              </div>
              <p className={styles.themeNote}>Full dark mode support is coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={styles.toggleRow}>
      <div className={styles.toggleInfo}>
        <div className={styles.toggleLabel}>{label}</div>
        <div className={styles.toggleDesc}>{description}</div>
      </div>
      <div
        className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
        onClick={onChange}
        role="switch"
        aria-checked={checked}
      >
        <div className={styles.toggleThumb} />
      </div>
    </label>
  );
}
