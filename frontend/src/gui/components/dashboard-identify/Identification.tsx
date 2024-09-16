import { useState } from 'react';
import { Button } from '../ui/button';
import { BotMessageSquareIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Identification = ({ identification, image, handleSave, handleNew }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-6 w-full flex flex-col justify-center">
      <div className="w-full overflow-hidden rounded-lg mb-4">
        <a
          href={identification.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-orange underline mb-4"
        >
          <img
            src={`data:image/jpeg;base64,${image}`}
            className="w-full max-h-48 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 "
            alt="Identified Plant"
          />
        </a>
      </div>
      <div className="flex space-x-2 items-center mb-4">
        <h2 className="text-3xl font-bold">{identification.name}</h2>
        <div className="relative group">
          <button onClick={() => navigate('/dashboard/chat')}>
            <BotMessageSquareIcon className="w-10 h-10 text-green-600" />
          </button>

          {/* Tooltip text */}
          <div className="text-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm rounded py-1 px-2">
            Get Plant Care Tips
          </div>
        </div>
      </div>

      <p className="text-gray-700 italic mb-2">
        Common Names: {identification.common_names.join(', ')}
      </p>

      {/* Description with "Read More" functionality */}
      <div className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-4'}`}>
        <strong>Description:</strong> {identification.description}
      </div>

      {isExpanded && (
        <ul className="list-disc list-inside mb-2 flex flex-col gap-3 mt-1">
          <li>
            <strong>Best Light Condition:</strong>{' '}
            {identification.best_light_condition}
          </li>
          <li>
            <strong>Best Soil Type:</strong> {identification.best_soil_type}
          </li>
          <li>
            <strong>Best Watering Practice:</strong>{' '}
            {identification.best_watering}
          </li>
          <li>
            <strong>Common Uses:</strong>{' '}
            {identification.common_uses.join(', ')}
          </li>
          <li>
            <strong>Cultural Significance:</strong>{' '}
            {identification.cultural_significance}
          </li>
          <li>
            <strong>Toxicity:</strong> {identification.toxicity}
          </li>
        </ul>
      )}
      <Button
        onClick={toggleReadMore}
        variant="ghost"
        className="underline mb-4"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </Button>

      <a
        href={identification.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-orange underline mb-4 text-center"
      >
        Learn more on Wikipedia
      </a>

      <div className="flex space-x-4 justify-center">
        <Button
          onClick={handleSave}
          className="bg-primary-green hover:bg-green-700 w-full max-w-xs"
        >
          Save Plant
        </Button>
        <Button
          onClick={handleNew}
          className="bg-secondary-blue hover:bg-cyan-700 w-full max-w-xs"
        >
          Identify new Plant
        </Button>
      </div>
    </div>
  );
};

export default Identification;
