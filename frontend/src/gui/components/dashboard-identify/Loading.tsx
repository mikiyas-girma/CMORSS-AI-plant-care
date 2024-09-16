import { LeafIcon } from "lucide-react";

const Loading = ({ single }) => {
  return (
    <>
      <LeafIcon className="w-16 h-16 animate-pulse text-primary-green" />
      <h3 className="text-2xl font-bold text-gray-full">
        Processing Image{single ? "" : "s"}
      </h3>
      <p className="text-lg font-medium text-gray-500">Please wait...</p>
    </>
  );
};

export default Loading;
