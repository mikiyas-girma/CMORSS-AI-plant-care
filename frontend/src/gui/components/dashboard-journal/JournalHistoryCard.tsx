import { formatRelativeTime } from '@/lib/utils';
import Separator from '../common/Separator';
import CardAction from './JournalAction';
import useToasts from '@/hooks/useToasts';

type JournalHistoryCard = {
  title: string;
  messageCount?: number;
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
  date,
  journalId,
  onClick,
}) => {
  const { toastSuccess } = useToasts();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toastSuccess("Let's pretend it has deleted. 🤣");
  };

  // Return JSX To Component
  return (
    <div className="w-full sm:max-w-[300px] rounded-md bg-gray-neutral p-3 cursor-default">
      <div className="min-h-[50px] sm:text-lg">
        <p>{title.slice(0, 63)}...</p>
      </div>

      <Separator className="my-0" />

      <div className="flex justify-between gap-3 text-xs">
        <div>
          <CardAction
            label="Edit"
            onClick={() => onClick(journalId)}
            type="edit"
          />
          <CardAction label="Delete" onClick={handleDelete} type="delete" />
        </div>

        <p>{formatRelativeTime(new Date(date))}</p>
      </div>
    </div>
  );
};

export default JournalHistoryCard;
