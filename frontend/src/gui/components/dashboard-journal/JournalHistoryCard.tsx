import { formatRelativeTime } from '@/lib/utils';
import Separator from '../common/Separator';
import CardAction from './JournalAction';
import useToasts from '@/hooks/useToasts';
import { JournalHistoryCardType } from '@/types/journal';
import deleteJournal from '@/lib/deleteJournal';

/**
 *Chat History Card
 * @returns
 */
const JournalHistoryCard: React.FC<JournalHistoryCardType> = ({
  title,
  date,
  journalId,
  onClick,
  type = 'journal-page',
}) => {
  const { toastSuccess } = useToasts();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const choice = confirm('Are you sure you want to delete this journal?');

    if (choice) {
      const isDeleted = await deleteJournal(journalId);
      if (isDeleted) toastSuccess("Let's pretend it has deleted. 🤣");
    }
  };

  // Return JSX To Component
  return (
    <div className="w-full sm:max-w-[300px] rounded-md bg-gray-neutral p-3 cursor-default">
      <div className="min-h-[50px] sm:text-lg">
        <p>{title.slice(0, 63)}...</p>
      </div>

      <Separator className="my-0" />

      {type === 'journal-page' && (
        <div className="flex justify-between gap-3 text-xs">
          <div>
            <CardAction
              label="Edit"
              onClick={() => {
                if (onClick) onClick(journalId);
              }}
              type="edit"
            />
            <CardAction label="Delete" onClick={handleDelete} type="delete" />
          </div>

          {date && <p>{formatRelativeTime(new Date(date))}</p>}
        </div>
      )}
    </div>
  );
};

export default JournalHistoryCard;
