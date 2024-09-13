import { formatRelativeTime } from '@/lib/utils';

type JournalHistoryCard = {
  title: string;
  messageCount: number;
  date: string;
  journalId: string;
  onClick: (journalId: string) => void;
};

/**
 *Chat History Card
 * @returns
 */
const JournalHistoryCard: React.FC<JournalHistoryCard> = ({
  title,
  messageCount,
  date,
  journalId,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(journalId)}>
      <div className="min-w-[250px] rounded-md bg-gray-neutral p-3 transition-transform duration-300 ease-linear hover:scale-90">
        <div>
          <p>{title}</p>
        </div>
        <div className="flex justify-between gap-3 text-xs">
          <p>Message: {messageCount}</p>
          <p>{formatRelativeTime(new Date(date))}</p>
        </div>
      </div>
    </div>
  );
};

export default JournalHistoryCard;
