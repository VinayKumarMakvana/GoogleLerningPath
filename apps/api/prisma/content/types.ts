export interface TopicContent {
  title: string; // The exact title as it exists in the DB (e.g. "Program structure")
  learningContent: string;
  fullNotes: string;
  shortNotes: string;
  cheatSheet: string;
  resources: {
    title: string;
    url?: string;
    type: 'ARTICLE' | 'VIDEO' | 'COURSE' | 'TOOL' | 'BOOK';
    priority: 'S' | 'A' | 'B';
    description?: string;
    status?: string;
  }[];
}
