import { Button } from "../ui/button";

const IdentificationFooter = ({ onTryAgain }) => {
  return (
    <div className="flex flex-col items-center text-gray-700">
      <div className="flex items-center justify-center">
        <p className="text-sm">Not what you're looking for?</p>
        <Button onClick={onTryAgain} variant="ghost" className="px-2 font-bold">
          Try Again
        </Button>
      </div>
      <div className="flex space-x-2">
        <p className="text-sm text-gray-900">Powered by </p>
        <a href="https://plant.id/" target="_blank" rel="noopener noreferrer">
          <img src="/kindwise.png" className="w-20" alt="Kindwise Logo" />
        </a>
      </div>
    </div>
  );
};

export default IdentificationFooter;
