import { formatRelativeTime } from '@/lib/utils';
import Separator from '../common/Separator';
import CardAction from './JournalAction';
import useToasts from '@/hooks/useToasts';
import { useState } from 'react';

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
  // const [showEditModal, setShowEditModal] = useState(false);

  const { toastSuccess } = useToasts();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toastSuccess("Let's pretend it has deleted. 🤣");
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toastSuccess('Feature Coming Soon. Hehe 😉');
  };

  // Return JSX To Component
  return (
    <div
      className="w-full max-w-[300px] rounded-md bg-gray-neutral p-3"
      onClick={() => onClick(journalId)}
    >
      <div className="min-h-[50px] text-lg">
        <p>{title.slice(0, 63)}...</p>
      </div>

      <Separator className="my-0" />

      <div className="flex justify-between gap-3 text-xs">
        <div>
          <CardAction label="Edit" onClick={handleEdit} type="edit" />

          <CardAction label="Delete" onClick={handleDelete} type="delete" />
        </div>

        <p>{formatRelativeTime(new Date(date))}</p>
      </div>
    </div>
  );
};

export default JournalHistoryCard;
