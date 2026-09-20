'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/shared/EmptyState';

import { fetchApi } from '@/services/api';

type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'PENDING';

interface TopicData {
  id: string;
  title: string;
  difficulty: string;
  priority: string;
  learningContents: { title: string; content: string; status: ContentStatus }[];
  notes: { title: string; content: string; status: ContentStatus }[];
  shortNotes: { title: string; content: string; status: ContentStatus }[];
  cheatSheets: { title: string; content: string; status: ContentStatus }[];
  resources: { title: string; url?: string; type: string; priority: string; status: ContentStatus }[];
}

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learn' | 'notes' | 'shortNotes' | 'cheatSheet' | 'resources'>('learn');

  useEffect(() => {
    fetchApi<TopicData>(`/curriculum/topics/${id}`)
      .then(data => {
        setTopic(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch topic', err);
        setLoading(false);
      });
  }, [id]);

  const handleMarkProgress = async (type: string) => {
    try {
      await fetchApi(`/curriculum/progress/TOPIC/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'COMPLETED', metadata: { type } })
      });
      alert(`Marked ${type} as reviewed!`);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading topic details...</div>;
  }

  if (!topic) {
    return (
      <div className={styles.container}>
        <EmptyState title="Topic Not Found" message="The requested topic could not be found." />
      </div>
    );
  }

  // Helpers to get first published content
  const learnContent = topic.learningContents.find(c => c.status === 'PUBLISHED');
  const noteContent = topic.notes.find(c => c.status === 'PUBLISHED');
  const shortNoteContent = topic.shortNotes.find(c => c.status === 'PUBLISHED');
  const cheatSheetContent = topic.cheatSheets.find(c => c.status === 'PUBLISHED');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{topic.title}</h1>
          <Button variant="outline" onClick={() => router.push(`/practice?topic=${topic.id}`)}>
            Practice this topic
          </Button>
        </div>
        <div className={styles.meta}>
          <Badge variant={topic.difficulty === 'BEGINNER' ? 'success' : 'primary'}>
            {topic.difficulty}
          </Badge>
          <Badge variant="warning">{topic.priority.replace('_', ' ')}</Badge>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'learn' ? styles.activeTab : ''}`} onClick={() => setActiveTab('learn')}>Learn</button>
        <button className={`${styles.tab} ${activeTab === 'notes' ? styles.activeTab : ''}`} onClick={() => setActiveTab('notes')}>Notes</button>
        <button className={`${styles.tab} ${activeTab === 'shortNotes' ? styles.activeTab : ''}`} onClick={() => setActiveTab('shortNotes')}>Short Notes</button>
        <button className={`${styles.tab} ${activeTab === 'cheatSheet' ? styles.activeTab : ''}`} onClick={() => setActiveTab('cheatSheet')}>Cheat Sheet</button>
        <button className={`${styles.tab} ${activeTab === 'resources' ? styles.activeTab : ''}`} onClick={() => setActiveTab('resources')}>Resources</button>
      </div>

      <div className={styles.contentArea}>
        {activeTab === 'learn' && (
          <div>
            {learnContent ? (
              <div className={styles.markdown}>
                <ReactMarkdown>{learnContent.content}</ReactMarkdown>
                <div className={styles.actionArea}>
                  <Button variant="primary" onClick={() => handleMarkProgress('LEARNING')}>Mark as Completed</Button>
                </div>
              </div>
            ) : (
              <div className={styles.pendingNotice}>Learning content is pending curation for this topic.</div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            {noteContent ? (
              <div className={styles.markdown}>
                <ReactMarkdown>{noteContent.content}</ReactMarkdown>
              </div>
            ) : (
              <div className={styles.pendingNotice}>Full notes are not yet available.</div>
            )}
          </div>
        )}

        {activeTab === 'shortNotes' && (
          <div>
            {shortNoteContent ? (
              <div className={styles.markdown}>
                <ReactMarkdown>{shortNoteContent.content}</ReactMarkdown>
                <div className={styles.actionArea}>
                  <Button variant="secondary" onClick={() => handleMarkProgress('REVISION')}>Needs Revision</Button>
                  <Button variant="primary" onClick={() => handleMarkProgress('REVISION')}>Mark Reviewed</Button>
                </div>
              </div>
            ) : (
              <div className={styles.pendingNotice}>Short notes are pending curation.</div>
            )}
          </div>
        )}

        {activeTab === 'cheatSheet' && (
          <div>
            {cheatSheetContent ? (
              <div className={styles.markdown}>
                <ReactMarkdown>{cheatSheetContent.content}</ReactMarkdown>
              </div>
            ) : (
              <div className={styles.pendingNotice}>Cheat sheet is pending curation.</div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className={styles.resourceList}>
            {topic.resources.length > 0 ? (
              topic.resources.map((r, i) => (
                <div key={i} className={styles.resourceCard}>
                  <div className={styles.resourceInfo}>
                    <h3>{r.title}</h3>
                    <div className={styles.resourceMeta}>
                      <Badge variant="primary">{r.type}</Badge>
                      <Badge variant="warning">Priority {r.priority}</Badge>
                    </div>
                  </div>
                  <div>
                    {r.status === 'PUBLISHED' && r.url ? (
                      <Button variant="primary" onClick={() => window.open(r.url, '_blank')}>Open Resource</Button>
                    ) : (
                      <Badge variant="secondary">PENDING CURATION</Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.pendingNotice}>No resources available yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
