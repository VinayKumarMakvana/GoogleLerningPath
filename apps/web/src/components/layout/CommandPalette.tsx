"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  Code2, 
  Network, 
  Brain, 
  BookOpen, 
  Award, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { SYSTEM_DESIGN_TOPICS } from '@/data/systemDesignData';
import { AIML_TOPICS } from '@/data/aimlData';
import styles from './CommandPalette.module.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATIC_ROUTES = [
  { title: 'Engineering Command Center', category: 'Navigation', href: '/dashboard', icon: Sparkles },
  { title: 'Curriculum & Tracks', category: 'Navigation', href: '/learn', icon: BookOpen },
  { title: 'Master Roadmap', category: 'Navigation', href: '/roadmap', icon: BookOpen },
  { title: 'DSA Practice Arena', category: 'Practice', href: '/practice', icon: Code2 },
  { title: 'Timed Assessments', category: 'Assessments', href: '/assessments', icon: Award },
  { title: 'System Design Masterclass', category: 'Specialization', href: '/system-design', icon: Network },
  { title: 'AI / ML Systems Engineering', category: 'Specialization', href: '/ai-ml', icon: Brain },
  { title: 'Career & Placement Pipeline', category: 'Career', href: '/career', icon: Briefcase },
  { title: 'Adaptive Interview Hub', category: 'Interview', href: '/interview', icon: Award },
  { title: 'AI Deterministic Mentor', category: 'Mentor', href: '/mentor', icon: Brain },
  { title: 'Candidate Profile', category: 'User', href: '/profile', icon: Briefcase },
  { title: 'Account Settings', category: 'User', href: '/settings', icon: Briefcase },
];

const CURATED_PROBLEMS = [
  { title: 'LRU Cache (High Frequency Google Question)', category: 'Practice Problem', href: '/practice' },
  { title: 'Sliding Window Maximum (Monotonic Deque)', category: 'Practice Problem', href: '/practice' },
  { title: 'Minimum Window Substring (Two Pointers)', category: 'Practice Problem', href: '/practice' },
  { title: 'Course Schedule (Topological Sort / Kahns)', category: 'Practice Problem', href: '/practice' },
  { title: 'Word Break (Dynamic Programming)', category: 'Practice Problem', href: '/practice' },
  { title: 'Median of Two Sorted Arrays (Binary Search)', category: 'Practice Problem', href: '/practice' },
  { title: 'Design Add and Search Words Data Structure (Trie)', category: 'Practice Problem', href: '/practice' },
  { title: 'Trapping Rain Water (Two Pointers / Monotonic Stack)', category: 'Practice Problem', href: '/practice' },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return STATIC_ROUTES.slice(0, 8);
    }

    const matches: Array<{ title: string; category: string; href: string; icon?: React.ElementType }> = [];

    // Search Routes
    STATIC_ROUTES.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) {
        matches.push(r);
      }
    });

    // Search System Design
    SYSTEM_DESIGN_TOPICS.forEach(sd => {
      if (sd.title.toLowerCase().includes(q) || sd.description.toLowerCase().includes(q)) {
        matches.push({
          title: `System Design: ${sd.title}`,
          category: 'System Design',
          href: '/system-design',
          icon: Network
        });
      }
    });

    // Search AI/ML
    AIML_TOPICS.forEach(ai => {
      if (ai.title.toLowerCase().includes(q) || ai.description.toLowerCase().includes(q)) {
        matches.push({
          title: `AI/ML: ${ai.title}`,
          category: 'AI / ML Track',
          href: '/ai-ml',
          icon: Brain
        });
      }
    });

    // Search Practice Problems
    CURATED_PROBLEMS.forEach(p => {
      if (p.title.toLowerCase().includes(q)) {
        matches.push({
          title: p.title,
          category: p.category,
          href: p.href,
          icon: Code2
        });
      }
    });

    return matches.slice(0, 10);
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search problems, system design, AI/ML topics, curriculum..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
              } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault();
                handleSelect(results[selectedIndex].href);
              }
            }}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Command Palette">
            <X size={16} />
          </button>
        </div>

        <div className={styles.resultsList}>
          {results.length === 0 ? (
            <div className={styles.emptyState}>
              No matching modules, patterns, or topics found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon || ArrowRight;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  className={`${styles.resultItem} ${isSelected ? styles.resultItemActive : ''}`}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.iconWrap}>
                      <Icon size={16} />
                    </div>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </div>
                  <span className={styles.itemCategory}>{item.category}</span>
                </div>
              );
            })
          )}
        </div>

        <div className={styles.footer}>
          <span>Use <kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> to navigate</span>
          <span><kbd className={styles.kbd}>↵</kbd> to select</span>
          <span><kbd className={styles.kbd}>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
