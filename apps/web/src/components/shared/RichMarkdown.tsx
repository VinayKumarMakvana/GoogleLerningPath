import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './RichMarkdown.module.css';

interface RichMarkdownProps {
  content: string;
  className?: string;
}

export function RichMarkdown({ content, className = '' }: RichMarkdownProps) {
  if (!content) return null;

  return (
    <div className={`${styles.markdownContainer} ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className={styles.h1} {...props} />,
          h2: ({ node, ...props }) => <h2 className={styles.h2} {...props} />,
          h3: ({ node, ...props }) => <h3 className={styles.h3} {...props} />,
          p: ({ node, ...props }) => <p className={styles.p} {...props} />,
          ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
          ol: ({ node, ...props }) => <ol className={styles.ol} {...props} />,
          li: ({ node, ...props }) => <li className={styles.li} {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className={styles.blockquote} {...props} />,
          code: ({ node, className: codeClass, children, ...props }: any) => {
            const isInline = !codeClass && typeof children === 'string' && !children.includes('\n');
            if (isInline) {
              return <code className={styles.inlineCode} {...props}>{children}</code>;
            }
            return (
              <div className={styles.codeBlockWrapper}>
                <pre className={styles.codeBlock}>
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          table: ({ node, ...props }) => (
            <div className={styles.tableWrapper}>
              <table className={styles.table} {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className={styles.th} {...props} />,
          td: ({ node, ...props }) => <td className={styles.td} {...props} />,
          strong: ({ node, ...props }) => <strong className={styles.strong} {...props} />,
          hr: ({ node, ...props }) => <hr className={styles.hr} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
