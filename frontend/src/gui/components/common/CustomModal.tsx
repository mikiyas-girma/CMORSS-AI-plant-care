import { ReactNode } from 'react';

type ModalType = {
  children: ReactNode;
  closeModal?: () => void;
  className?: string;
  size?: 'mini' | 'default';
};

const CustomModal: React.FC<ModalType> = ({
  children,
  closeModal,
  size = 'default',
}) => {
  return (
    <div className="p-4 sm:p-8 w-full h-full absolute top-0 left-0 bg-slate-500 bg-opacity-60 backdrop-blur-xl items-center justify-center flex z-20">
      {/* Render Children  */}
      {children}

      <div
        role="button"
        onClick={closeModal && closeModal}
        className="absolute right-5 px-3 py-1 sm:text-base text-xs text-center top-4 text-white border rounded-xl cursor-pointer bg-gray-full hover:bg-white hover:bg-opacity-20 hover:text-black transition-all hover:scale-95"
      >
        <p>{size === 'mini' ? 'X' : 'Close'}</p>
      </div>
    </div>
  );
};

export default CustomModal;
