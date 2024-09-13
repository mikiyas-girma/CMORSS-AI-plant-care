/**
 * Plant Journalling
 * @returns JSX Component for the view
 */

import CustomModal from '@/gui/components/common/CustomModal';
import LoadingComp from '@/gui/components/common/LoadingComp';
import ActionBar from '@/gui/components/dashboard-journal/ActionBar';
import CreateJournal from '@/gui/components/dashboard-journal/CreateJournal';
import EmptyJournalHistory from '@/gui/components/dashboard-journal/EmptyJournalHistory';
import JournalHistory from '@/gui/components/dashboard-journal/JournalHistory';
import useToasts from '@/hooks/useToasts';
import { PlantJournalType } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Journal Layout within the Dashboard.
 * @returns JSX Component.
 */
const Journal = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const [reload, setReload] = useState(0);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [journals, setJournals] = useState<PlantJournalType[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);

  const { toastSuccess, toastWarning } = useToasts();

  // Make request to fetch Journals
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setJournals([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [reload]);

  // Handle Journal Search Action
  const handleSearch = useCallback(async () => {
    if (searchText.length < 4) {
      return toastWarning('Provide at least a 4 characters.');
    }

    toastSuccess(`Search Term: ${searchText}`);
  }, [searchText, toastSuccess, toastWarning]);

  // Return JSX Component
  return (
    <section className="scrollbar-thin h-full w-full p-3 md:p-8 flex flex-col justify-center items-center relative">
      <h2 className="text-xl md:text-2xl font-bold text-gray-full text-center md:w-[80%] mx-auto">
        Keep a Private Journal of your Plant Activities or Record New Entries
        Based on New Knowledge
      </h2>

      {/* Action Bar */}
      <ActionBar
        searchText={searchText}
        setSearchText={setSearchText}
        setShowCreateModal={setShowCreateModal}
        handleSearch={handleSearch}
      />

      {showCreateModal && (
        <CustomModal closeModal={() => setShowCreateModal(false)}>
          <CreateJournal
            closeModal={() => setShowCreateModal(false)}
            setReload={setReload}
          />
        </CustomModal>
      )}

      {loading && (
        <LoadingComp
          message="Loading Journal Records..."
          iconType="box"
          iconColor="green"
          className="h-[50%]"
        />
      )}

      {/* Show Modal for for Selected Journal */}
      {selectedJournal && (
        <div>
          <p>{selectedJournal}</p>
        </div>
      )}

      {!loading && journals.length === 0 && <EmptyJournalHistory />}
      {!loading && journals.length > 0 && (
        <JournalHistory
          journals={journals}
          setSelectedJournal={setSelectedJournal}
        />
      )}
    </section>
  );
};

export default Journal;
