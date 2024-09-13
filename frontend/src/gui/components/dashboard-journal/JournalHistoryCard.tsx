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
    <div onClick={() => onClick(journalId)}>
      <div className="max-w-[300px] mx-auto rounded-md bg-gray-neutral p-3 transition-transform duration-300 ease-linear hover:scale-90 ">
        <div className="mb-2 min-h-[50px]">
          <p>{title}</p>
        </div>
        <Separator className="my-0" />
        <div className="flex justify-between gap-3 text-xs ">
          <p>Message: {messageCount}</p>
          <p>{formatRelativeTime(new Date(date))}</p>
        </div>
      </div>
    </div>
  );
};

export default JournalHistoryCard;
