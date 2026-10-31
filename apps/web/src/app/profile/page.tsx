'use client';

import React, { useEffect, useState } from 'react';
import { userApi, UserProfile } from '@/services/userApi';
import { User, Mail, Target, GraduationCap, Calendar, Edit3, Save, X, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    target: '',
    graduation: '',
  });

  useEffect(() => {
    userApi.getMe()
      .then((data) => {
        setUser(data);
        setForm({
          firstName: data.profile?.firstName || '',
          lastName: data.profile?.lastName || '',
          target: data.profile?.target || '',
          graduation: data.profile?.graduation
            ? new Date(data.profile.graduation).toISOString().split('T')[0]
            : '',
        });
      })
      .catch(() => setError('Failed to load profile. Please log in again.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await userApi.updateProfile(form);
      // Refresh
      const updated = await userApi.getMe();
      setUser(updated);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const displayName =
    user?.profile?.firstName || user?.profile?.lastName
      ? `${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`.trim()
      : 'Guest User';

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : '—';

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Loading your profile…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Manage your personal information and learning goals.</p>
      </div>

      {saved && (
        <div className={styles.successBanner}>
          <CheckCircle size={16} />
          Profile updated successfully.
        </div>
      )}

      <div className={styles.layout}>
        {/* Left: Avatar card */}
        <aside className={styles.avatarCard}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.displayName}>{displayName}</div>
          <div className={styles.email}>
            <Mail size={14} />
            {user?.email}
          </div>
          <div className={styles.joinDate}>Member since {joinedDate}</div>

          <div className={styles.goalsList}>
            <div className={styles.goalsLabel}>Active Goals</div>
            {user?.goals && user.goals.length > 0 ? (
              user.goals.map((goal) => (
                <div key={goal.id} className={styles.goalItem}>
                  <Target size={13} />
                  <span>{goal.title}</span>
                </div>
              ))
            ) : (
              <div className={styles.noGoals}>No goals set yet.</div>
            )}
          </div>
        </aside>

        {/* Right: editable info */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <h2 className={styles.detailsTitle}>Personal Information</h2>
            {!editing ? (
              <button className={styles.editBtn} onClick={() => setEditing(true)}>
                <Edit3 size={15} /> Edit
              </button>
            ) : (
              <div className={styles.editActions}>
                <button className={styles.cancelBtn} onClick={() => setEditing(false)}>
                  <X size={15} /> Cancel
                </button>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  <Save size={15} /> {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>First Name</label>
              {editing ? (
                <input
                  className={styles.input}
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Your first name"
                />
              ) : (
                <div className={styles.fieldValue}>{user?.profile?.firstName || <span className={styles.empty}>Not set</span>}</div>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Last Name</label>
              {editing ? (
                <input
                  className={styles.input}
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Your last name"
                />
              ) : (
                <div className={styles.fieldValue}>{user?.profile?.lastName || <span className={styles.empty}>Not set</span>}</div>
              )}
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <Target size={14} /> Target Role
              </label>
              {editing ? (
                <input
                  className={styles.input}
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  placeholder="e.g. Google SWE, Microsoft SWE"
                />
              ) : (
                <div className={styles.fieldValue}>{user?.profile?.target || <span className={styles.empty}>Not set</span>}</div>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <GraduationCap size={14} /> Graduation Date
              </label>
              {editing ? (
                <input
                  className={styles.input}
                  type="date"
                  value={form.graduation}
                  onChange={(e) => setForm({ ...form, graduation: e.target.value })}
                />
              ) : (
                <div className={styles.fieldValue}>
                  {user?.profile?.graduation
                    ? new Date(user.profile.graduation).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                    : <span className={styles.empty}>Not set</span>}
                </div>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <Mail size={14} /> Email
              </label>
              <div className={styles.fieldValue}>{user?.email}</div>
            </div>
          </div>

          {/* Career profile section */}
          {user?.careerProfile && (
            <div className={styles.careerSection}>
              <div className={styles.careerTitle}>Career Profile</div>
              <div className={styles.careerGrid}>
                <div className={styles.careerItem}>
                  <span className={styles.careerLabel}>Target Role</span>
                  <span className={styles.careerValue}>{user.careerProfile.targetRole}</span>
                </div>
                <div className={styles.careerItem}>
                  <span className={styles.careerLabel}>Resume Status</span>
                  <span className={`${styles.careerValue} ${styles[`resume_${user.careerProfile.resumeStatus}`]}`}>
                    {user.careerProfile.resumeStatus.replace('_', ' ')}
                  </span>
                </div>
                {user.careerProfile.education && (
                  <div className={styles.careerItem}>
                    <span className={styles.careerLabel}>Education</span>
                    <span className={styles.careerValue}>{user.careerProfile.education}</span>
                  </div>
                )}
                {user.careerProfile.targetLocations?.length > 0 && (
                  <div className={styles.careerItem}>
                    <span className={styles.careerLabel}>Target Locations</span>
                    <span className={styles.careerValue}>{user.careerProfile.targetLocations.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
