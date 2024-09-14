import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <>
      <LoaderIcon className="animate-spin text-primary-orange mb-4" size={48} />
      <h3 className="text-2xl font-bold text-gray-full">Processing Image</h3>
      <p className="text-lg font-medium text-gray-500">Please wait...</p>
    </>
  );
};

export default Loading;
