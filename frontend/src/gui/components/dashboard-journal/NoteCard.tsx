import { formatRelativeTime } from '@/lib/utils';
import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import Separator from '../common/Separator';

type NoteCardType = {
  date: string | Date;
  content: string;
  type: 'image' | 'text';
};

const NoteCard: React.FC<NoteCardType> = ({ date, content, type }) => {
  const [showFullImage, setShowFullImage] = useState(false);

  //   Return State
  return (
    <div className="w-full rounded-ss-lg bg-gray-neutral mb-3 p-3 ">
      {type === 'image' && <img src={content} alt="Journal Note Image" />}

      {type === 'image' && showFullImage && (
        <CustomModal closeModal={() => setShowFullImage(false)}>
          <img src={content} alt="Full Image View" />
        </CustomModal>
      )}

      {type === 'text' && <p className="whitespace-pre-wrap ">{content}</p>}

      <Separator />
      <p className="mt-2 rounded-lg bg-white w-fit text-xs py-1 px-2 cursor-default">
        {formatRelativeTime(new Date(date))}
      </p>
    </div>
  );
};

export default NoteCard;
