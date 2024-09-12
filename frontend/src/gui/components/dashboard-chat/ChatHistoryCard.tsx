import { formatRelativeTime } from '@/lib/utils';
import { Link } from 'react-router-dom';

type HistoryCard = {
  title: string;
  messageCount: number;
  date: string;
  chatId: string;
};

/**
 *Chat History Card
 * @returns
 */
const ChatHistoryCard: React.FC<HistoryCard> = ({
  title,
  messageCount,
  date,
  chatId,
}) => {
  return (
    <Link to={`/dashboard/chat?id=${chatId}`}>
      <div className="min-w-[250px] rounded-md bg-gray-neutral p-3 transition-transform duration-300 ease-linear hover:scale-90">
        <div>
          <p>{title}</p>
        </div>
        <div className="flex justify-between gap-3 text-xs">
          <p>Message: {messageCount}</p>
          <p>{formatRelativeTime(new Date(date))}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatHistoryCard;
