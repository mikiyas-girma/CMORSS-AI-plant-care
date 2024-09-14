import React from 'react';
import { Textarea } from '../ui/textarea';
import { LoaderCircle, Send } from 'lucide-react';

type SendNoteType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  sending: boolean;
};

const SendNote: React.FC<SendNoteType> = ({
  text,
  setText,
  handleSend,
  sending,
}) => {
  return (
    <div className="flex w-full">
      <Textarea
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
        placeholder="Record a new note..."
        className="resize-none text-base rounded-none min-w-[300px] w-full"
      />

      <button
        type="button"
        disabled={sending}
        onClick={handleSend}
        className="bg-primary-green flex place-items-center px-4 disabled:bg-gray-full disabled:cursor-not-allowed"
      >
        {!sending && <Send color="white" />}
        {sending && <LoaderCircle color="white" className="animate-spin" />}
      </button>
    </div>
  );
};

export default SendNote;
