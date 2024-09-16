import { LeafyGreen } from "lucide-react";
import React from "react";

const IdentificationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-6 w-full h-64 bg-gray-50">
      <LeafyGreen className="w-12 h-12 mb-4 opacity-80 text-gray-800 " />
      <p className="text-gray-500 text-lg font-medium text-center">
        Add an image to get started
      </p>
      <p className="text-gray-400 text-sm mt-1">
        You can upload a plant image to identify its features
      </p>
    </div>
  );
};

export default IdentificationPlaceholder;
