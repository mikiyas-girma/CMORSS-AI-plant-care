import { useState } from "react";
import { Button } from "../ui/button";

const Identification = ({ identification, image, handleSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <h2 className="text-3xl font-bold mb-4">{identification.name}</h2>

      <p className="text-gray-700 italic mb-2">
        Common Names: {identification.common_names.join(", ")}
      </p>

      {/* Description with "Read More" functionality */}
      <div className={`text-gray-700 ${isExpanded ? "" : "line-clamp-4"}`}>
        <strong>Description:</strong> {identification.description}
      </div>

      {isExpanded && (
        <ul className="list-disc list-inside mb-2">
          <li>
            <strong>Best Light Condition:</strong>{" "}
            {identification.best_light_condition}
          </li>
          <li>
            <strong>Best Soil Type:</strong> {identification.best_soil_type}
          </li>
          <li>
            <strong>Best Watering Practice:</strong>{" "}
            {identification.best_watering}
          </li>
          <li>
            <strong>Common Uses:</strong> {identification.common_uses}
          </li>
          <li>
            <strong>Cultural Significance:</strong>{" "}
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
        {isExpanded ? "Show Less" : "Read More"}
      </Button>

      <a
        href={identification.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-orange underline mb-4"
      >
        Learn more on Wikipedia
      </a>

      <Button
        onClick={handleSave}
        className="bg-primary-green hover:bg-green-700"
      >
        Save Plant
      </Button>
    </div>
  );
};

export default Identification;
