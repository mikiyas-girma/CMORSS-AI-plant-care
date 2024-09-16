import { ReactNode } from 'react';

type ModalType = {
  children: ReactNode;
  closeModal?: () => void;
  className?: string;
  size?: 'mini' | 'default';
  positionCloseButton?: 'left' | 'right';
  overlayColor?: string;
};

const CustomModal: React.FC<ModalType> = ({
  children,
  closeModal,
  positionCloseButton = 'right',
  size = 'default',
  overlayColor = 'bg-slate-500',
}) => {
  // Get position of close button
  const position =
    positionCloseButton === 'right' ? 'right-5' : 'left-5 bg-red-500 ';

  // Return JSX
  return (
    <div
      className={`p-4 sm:p-8 w-full h-full absolute top-0 left-0  bg-opacity-60 backdrop-blur-xl items-center justify-center flex z-20 ${overlayColor}`}
    >
      {/* Render Children  */}
      {children}

      <div
        role="button"
        onClick={closeModal && closeModal}
        className={`absolute  px-3 py-1 sm:text-base text-xs text-center top-4 text-white border rounded-xl cursor-pointer bg-gray-full hover:bg-white hover:bg-opacity-20 hover:text-black transition-all hover:scale-95 ${position}`}
      >
        <p>{size === 'mini' ? 'X' : 'Close'}</p>
      </div>
    </div>
  );
};

export default CustomModal;
