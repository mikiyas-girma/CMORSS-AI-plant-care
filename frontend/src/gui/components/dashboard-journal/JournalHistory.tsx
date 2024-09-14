import { JournalCardType } from '@/types';
import JournalHistoryCard from './JournalHistoryCard';

type THistory = {
  journals: JournalCardType[];
  setSelectedJournal: React.Dispatch<React.SetStateAction<string | null>>;
};

const JournalHistory: React.FC<THistory> = ({
  journals,
  setSelectedJournal,
}) => {
  return (
    <section className="scrollbar-thin flex flex-wrap items-center gap-3 overflow-x-auto rounded-lg bg-white p-4 shadow-[inset_4px_4px_16px_rgba(0,0,0,0.2),inset_0_-2px_8px_rgba(0,0,0,0.2)]">
      {journals.map((journal, index) => (
        <JournalHistoryCard
          key={index}
          title={journal.title}
          messageCount={journal.messageCount}
          date={new Date(journal.lastUpdate).toISOString()}
          onClick={setSelectedJournal}
          journalId={journal._id}
        />
      ))}
    </section>
  );
};

export default JournalHistory;
