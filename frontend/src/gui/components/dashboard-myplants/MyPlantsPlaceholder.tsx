import React from "react";
import { Button } from "../ui/button";
import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const MyPlantsPlaceholder = ({ handleAdd }) => {
  return (
    <div className="text-center max-w-3xl mx-auto py-16 px-8">
      <h2 className="text-4xl font-extrabold text-gray-700 mb-6">
        Get Care Suggestions for Your Plants with Real-Time Weather Data
      </h2>
      <h4 className="text-lg text-gray-500 leading-relaxed mb-8">
        Our system automatically gathers real-time weather information and plant
        data, providing you with the best suggestions for plant care at any
        given moment.
      </h4>

      <Button
        onClick={handleAdd}
        className="bg-primary-green hover:bg-green-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Add a Plant
      </Button>

      <div className="mt-10">
        <Sprout className="w-24 h-24 text-primary-green mx-auto mb-4" />
        <p className="text-gray-600">
          You haven’t saved any plants yet. <br /> Start by visiting the {" "}
          <Link
            to={"/dashboard/plant-identification"}
            className=" underline text-primary-green font-semibold"
          >
            Plant Identification
          </Link>{" "}
          Page to begin your journey!
        </p>
      </div>
    </div>
  );
};

export default MyPlantsPlaceholder;
