export type JournalHistoryCardType = {
  title: string;
  messageCount?: number;
  date?: string;
  journalId: string;
  onClick?: (journalId: string) => void;
  type?: 'home' | 'journal-page';
};
