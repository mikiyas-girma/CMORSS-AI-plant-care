import { formatRelativeTime } from '@/lib/utils';
import Separator from '../common/Separator';

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
    <div
      className="w-full max-w-[300px] rounded-md bg-gray-neutral p-3 transition-transform duration-300 ease-linear hover:scale-90 "
      onClick={() => onClick(journalId)}
    >
      <div className="min-h-[50px] text-lg">
        <p>{title.slice(0, 63)}...</p>
      </div>
      <Separator className="my-0" />
      <div className="flex justify-between gap-3 text-xs ">
        <p>Message: {messageCount}</p>
        <p>{formatRelativeTime(new Date(date))}</p>
      </div>
    </div>
  );
};

export default JournalHistoryCard;
