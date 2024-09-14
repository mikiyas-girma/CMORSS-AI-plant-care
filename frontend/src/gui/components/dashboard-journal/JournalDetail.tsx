/* eslint-disable @typescript-eslint/no-explicit-any */
import useToasts from '@/hooks/useToasts';
import { PlantJournalType } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComp from '../common/LoadingComp';
import EmptyJournalHistory from './EmptyJournalHistory';
import Separator from '../common/Separator';
import JournalPlantStat from './JournalPlantStat';
import getSingleJournal from '@/lib/getSingleJournal';
import FilePickerButton from '../common/FilePickerButton';
import SendNote from './SendNote';
import { fileToBase64 } from '@/lib/fileToBase64';
import { axiosForApiCall } from '@/lib/axios';
import NoteCard from './NoteCard';

type JournalIDType = {
  journalId: string;
  closeModal?: () => void;
};

const JournalDetail: React.FC<JournalIDType> = ({ journalId }) => {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [journal, setJournal] = useState<PlantJournalType>();
  const [noteText, setNoteText] = useState('');
  const [noteImage, setNoteImage] = useState<File | null>(null);

  const { toastError, toastSuccess } = useToasts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  //   Fetch user data
  useEffect(() => {
    setLoading(true);
    getSingleJournal(journalId).then((data) => {
      setJournal(data);
      setLoading(false);
    });
  }, [journalId, toastError]);

  //   Handle Sending
  const handleSendMessage = async () => {
    // Compose message object
    let noteData: any;
    let imageBase64: string;
    let fileUrl: string | null = null;

    if (noteText.trim().length === 0) {
      if (!noteImage)
        return toastError(
          'Missing fields. Either send a note or upload a photo.'
        );
    }

    setSending(true);

    try {
      // Send Image file to backend
      if (noteImage) {
        imageBase64 = await fileToBase64(noteImage);

        const res = await axiosForApiCall.post('/user/image-upload', {
          image: imageBase64,
          fileName: noteImage.name,
          username: 'John_Doe',
        });

        fileUrl = res.data.fileUrl;
      }

      if (fileUrl) {
        noteData = {
          content: fileUrl,
          type: 'image',
          text: noteText,
          userId: 'Stephen',
          journalId,
        };
      } else {
        noteData = {
          content: noteText,
          type: 'text',
          userId: 'Stephen',
          journalId,
        };
      }

      const res = await axiosForApiCall.post(
        '/user/journal/add-note',
        noteData
      );

      toastSuccess(res.data.message);
      setJournal(res.data.journal);
      setNoteText('');
      setNoteImage(null);

      //   Handle Error
    } catch (error: any) {
      if (error?.response) {
        toastError(error.response.data.message);
      }
      toastError('Connectivity Error. Unable to store note.');
    } finally {
      setSending(false);
    }
  };

  //   Return Loading component
  if (loading) {
    return (
      <LoadingComp
        message="Loading Journal..."
        className="text-white text-2xl"
        iconColor="white"
      />
    );
  }

  //   Return JsX
  return (
    <div className="bg-white h-full min-h-[700px] p-4 sm:p-8 rounded-lg w-full max-w-[650px]">
      {!loading && !journal && (
        <EmptyJournalHistory message="Unable to retrieve journal data..." />
      )}

      {journal && (
        <div className="h-full relative pt-3 sm:pt-0">
          <h3 className="text-xl text-center sm:text-left font-semibold text-slate-700">
            {journal.title}
          </h3>

          <JournalPlantStat
            name={journal.name}
            health={journal.health}
            location={journal.location}
            species={journal.species}
            dateAcquired={journal.dateAcquired}
          />

          <Separator />

          {/* Render Journal Notes */}
          <div className="w-full h-[55%] sm:h-[50%] lg:h-[64%] overflow-auto scrollbar-thin">
            {journal.notes.map((note, index) => (
              <NoteCard
                key={index}
                date={note.date}
                content={note.content}
                type={note.type}
              />
            ))}
          </div>

          {/* Input field container */}
          <div className=" bottom-0 left-0 absolute w-full bg-white">
            <SendNote
              text={noteText}
              setText={setNoteText}
              handleSend={handleSendMessage}
              sending={sending}
            />

            <FilePickerButton
              file={noteImage}
              setFile={setNoteImage}
              inputRef={fileInputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalDetail;
