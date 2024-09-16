/* eslint-disable @typescript-eslint/no-explicit-any */

import { PlantJournalType } from '@/types';
import JournalHistoryCard from '../dashboard-journal/JournalHistoryCard';
import { useEffect, useState } from 'react';
import LoadingComp from '../common/LoadingComp';
import { axiosForApiCall } from '@/lib/axios';
import useToasts from '@/hooks/useToasts';

const QuickJournalHistory = () => {
  // Fetch Top Four of the User's Chat history from the Database
  const [recent, setRecent] = useState<PlantJournalType[]>([]);
  const [loading, setLoading] = useState(true);

  const { toastError } = useToasts();

  useEffect(() => {
    setLoading(true);

    (async function () {
      try {
        const res = await axiosForApiCall({
          url: '/user/journal/recent',
          method: 'get',
        });

        const data = res.data.journals;
        console.log(data);
        setRecent(data);
      } catch (error: any) {
        if (error.response) {
          toastError(error.response.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [toastError]);

  if (loading) return <LoadingComp message="Loading Journal History..." />;

  if (!loading && recent?.length === 0) {
    <p>Nothing to show yet.</p>;
  }

  //   Return JSX Component
  return (
    <div className="scrollbar-thin flex gap-3 overflow-x-auto rounded-lg bg-white p-4 shadow-[inset_4px_4px_16px_rgba(0,0,0,0.2),inset_0_-2px_8px_rgba(0,0,0,0.2)]">
      {recent.map((journal, index) => (
        <JournalHistoryCard
          key={index}
          title={journal.title}
          journalId={journal._id}
        />
      ))}
    </div>
  );
};

export default QuickJournalHistory;
