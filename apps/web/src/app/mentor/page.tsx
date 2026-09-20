"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mentorApi, MentorContext, MentorResponse } from '@/services/mentorApi';
import { BrainCircuit, Loader2, ArrowRight, BookOpen, Clock, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const SUGGESTED_QUESTIONS = [
  "What should I study next?",
  "What should I revise today?",
  "Which patterns need work?",
  "Give me a practice session.",
  "How should I prepare for interviews?"
];

export default function MentorPage() {
  const router = useRouter();
  const [context, setContext] = useState<MentorContext | null>(null);
  const [loadingContext, setLoadingContext] = useState(true);
  
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'mentor'; text: string; data?: MentorResponse }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await mentorApi.getContext();
        setContext(ctx);
        setChatHistory([
          {
            role: 'mentor',
            text: 'Hello! I am your deterministic learning mentor. I track your actual progress across learning, practice, and assessments without guessing. How can I help you today?',
            data: {
              fact: 'I have successfully loaded your learning context.',
              recommendation: 'Ask me what to study next, what to revise, or how to prepare for interviews.',
              actions: []
            }
          }
        ]);
      } catch (error) {
        console.error('Failed to load mentor context', error);
      } finally {
        setLoadingContext(false);
      }
    };
    init();
  }, []);

  const handleAsk = async (question: string) => {
    setChatHistory(prev => [...prev, { role: 'user', text: question }]);
    setIsTyping(true);
    
    try {
      const response = await mentorApi.chat(question);
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'mentor', 
          text: 'Here is what I found based on your current data:', 
          data: response 
        }
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'mentor', 
          text: 'Sorry, I encountered an error checking your context. Please try again.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (loadingContext) {
    return (
      <div className={styles.container}>
        <PageHeader title="Mentor" />
        <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className={styles.spin} /> Loading Context...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Your Mentor" 
        description="Factual, data-driven guidance based on your actual progress."
      />

      <div className={styles.layout}>
        <div className={styles.chatCol}>
          <div className={styles.chatArea}>
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.mentorMsg}`}>
                {msg.role === 'mentor' && (
                  <div className={styles.avatar}>
                    <BrainCircuit size={20} />
                  </div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.text}>{msg.text}</div>
                  
                  {msg.data && (msg.data.fact || msg.data.recommendation) && (
                    <div className={styles.mentorData}>
                      {msg.data.fact && (
                        <div className={styles.factBox}>
                          <strong>FACT:</strong> {msg.data.fact}
                        </div>
                      )}
                      {msg.data.recommendation && (
                        <div className={styles.recBox}>
                          <strong>RECOMMENDATION:</strong> {msg.data.recommendation}
                        </div>
                      )}
                      {msg.data.actions && msg.data.actions.length > 0 && (
                        <div className={styles.actionsBox}>
                          {msg.data.actions.map((act, i) => (
                            <Button 
                              key={i} 
                              variant={i === 0 ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() => router.push(act.url)}
                            >
                              {act.label} <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.mentorMsg}`}>
                <div className={styles.avatar}><BrainCircuit size={20} /></div>
                <div className={styles.messageContent}>
                  <div className={styles.text}>Analyzing your learning data...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.sideCol}>
          <Card className={styles.contextCard}>
            <CardContent>
              <h3>Current Context</h3>
              <ul className={styles.contextList}>
                <li>
                  <BookOpen size={16} /> 
                  <span>{context?.currentFocus.topicsInProgress || 0} active topics</span>
                </li>
                <li>
                  <Clock size={16} /> 
                  <span>{context?.reviewQueue.count || 0} reviews pending</span>
                </li>
                <li>
                  <Activity size={16} /> 
                  <span>{context?.weakAreas.patterns.length || 0} weak patterns</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className={styles.suggestionsCard}>
            <CardContent>
              <h3>Suggested Questions</h3>
              <div className={styles.questionList}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button 
                    key={i} 
                    className={styles.questionBtn}
                    onClick={() => handleAsk(q)}
                    disabled={isTyping}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
