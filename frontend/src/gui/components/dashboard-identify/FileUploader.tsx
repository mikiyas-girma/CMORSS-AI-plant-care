import React, { useRef } from "react";
import { Button } from "@/gui/components/ui/button";
import { XIcon, PlusCircle } from "lucide-react"; // Assuming lucide-react for icons

/**
 * A file uploader component that allows users to add files to a list and remove them.
 */
const FileUploader = ({files, setFiles}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Use ref to access the input element

  // Handle adding new files to the list
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  // Trigger the file input when the button is clicked
  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  // Handle removing a file from the list
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* File Input */}
      <div className="flex flex-col items-center space-y-4">
        <Button
          variant="outline"
          className="flex items-center text-primary-orange hover:bg-primary-orange-dark py-2 px-4 rounded-full shadow-lg"
          onClick={handleUploadClick} // Click event triggers the hidden input
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Add Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <ul className="w-3/4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg w-fir"
            >
              <span className="text-sm text-gray-700 min-w-full truncate">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
