import React from 'react';

type ActionType = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: 'edit' | 'delete';
};

const CardAction: React.FC<ActionType> = ({ label, onClick, type }) => {
  return (
    <button
      className={`${
        type === 'edit' ? 'bg-slate-500' : 'bg-red-500'
      } px-1 py-[2px] text-white rounded hover:bg-slate-900 transition-all cursor-pointer mr-2`}
      onClick={onClick}
      //   onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CardAction;
