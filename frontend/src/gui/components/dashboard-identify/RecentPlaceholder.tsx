import { Sprout } from "lucide-react";
import React from "react";

const RecentPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Sprout className="w-12 h-12 mb-4 opacity-70 text-primary-green" />
      <p className="text-gray-600 font-medium text-lg text-center">
        No Recent Plants Identified
      </p>
      <p className="text-gray-400 text-sm mt-2 text-center">
        Start uploading images to identify plants and track them here!
      </p>
    </div>
  );
};

export default RecentPlaceholder;
