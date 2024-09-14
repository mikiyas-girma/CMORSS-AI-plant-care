import React from 'react';
import { toast } from 'sonner';

type FilePickerType = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const FilePickerButton: React.FC<FilePickerType> = ({
  file,
  setFile,
  inputRef,
}) => {
  //   Handle File input Clicked
  const handleButtonClick = () => {
    if (file) {
      return setFile(null);
    }

    if (inputRef.current) inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024 + 1)
        return toast.error('File size too large. 2mb max');

      setFile(file);
    }
  };

  return (
    <div className="text-xs sm:text-sm mt-1 flex gap-2 items-center">
      <button
        className={`rounded-lg  hover:bg-primary-orange transition-colors duration-500 ease-in border p-2 ${
          file ? 'bg-red-500 text-white' : 'bg-gray-neutral'
        }`}
        onClick={handleButtonClick}
      >
        {file ? 'Remove Image' : 'Add Image'}
      </button>

      {file && (
        <p className="truncate text-xs md:text-sm hover:underline cursor-default">
          {file.name.slice(0, 40)}
        </p>
      )}

      <input
        className="hidden"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilePickerButton;
