import { ReactNode } from 'react';

type ModalType = {
  children: ReactNode;
  closeModal?: () => void;
};

const CustomModal: React.FC<ModalType> = ({ children, closeModal }) => {
  return (
    <div className="p-8 w-full h-full absolute top-0 left-0 bg-black bg-opacity-60 backdrop-blur-xl items-center justify-center flex z-20">
      {/* Render Children  */}
      {children}

      <div
        role="button"
        onClick={closeModal && closeModal}
        className="absolute right-5 px-3 py-1 text-center top-4 text-white border rounded-xl cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-black transition-all hover:scale-95"
      >
        <p>Close</p>
      </div>
    </div>
  );
};

export default CustomModal;
