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
    <div
      className={`${
        type === 'text' ? 'w-[95%] lg:-[90%]' : 'w-[95%] md:w-[70%]'
      } rounded-tl-lg rounded-tr-lg rounded-br-lg bg-gray-neutral mb-3 p-3`}
    >
      {type === 'image' && (
        <div
          className="w-full sm:h-[200px] md:h-[250px] relative rounded-md overflow-hidden cursor-pointer"
          onClick={() => setShowFullImage(true)}
        >
          <div className="w-full h-full absolute top-0 left-0 bg-slate-900 bg-opacity-50 flex place-content-center place-items-center text-white md:text-sm text-xs text-center hover:bg-opacity-80 transition-all ease-in-out duration-300">
            <p>Click to View Full Image</p>
          </div>
          {/* Image */}
          <img src={content} alt="Journal Note Image" className="" />
        </div>
      )}

      {type === 'image' && showFullImage && (
        <CustomModal
          closeModal={() => setShowFullImage(false)}
          className=""
          size="mini"
        >
          <img
            src={content}
            alt="Full Image View"
            className=" w-full h-full rounded-lg object-contain"
          />
        </CustomModal>
      )}

      {type === 'text' && (
        <p className="whitespace-pre-wrap text-sm sm:text-base">{content}</p>
      )}

      <Separator />
      <p className="sm:mt-2 rounded-lg bg-white w-fit text-xs py-1 px-2 cursor-default">
        {formatRelativeTime(new Date(date))}
      </p>
    </div>
  );
};

export default NoteCard;
