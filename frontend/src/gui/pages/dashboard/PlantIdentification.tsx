/**
 * Plant Journalling
 * @returns JSX Component for the view
 */

import { ImageUpload, plantImage1 } from "@/assets";
import { Button } from "@/gui/components/ui/button";
import { Card } from "@/gui/components/ui/card";
import { Input } from "@/gui/components/ui/input";
import { LoaderIcon } from "lucide-react";

/**
 * Journal Layout within the Dashboard.
 * @returns JSX Component.
 */
const DashboardPlantIdentification = () => {
  // Return JSX Component
  return (
    <section className="h-full w-full py-3 pr-3 md:py-8 md:pr-8 flex justify-center items-center relative">
      {/* Left scrollable section */}
      <div className="w-2/5 h-full flex flex-col items-center justify-start overflow-y-auto p-4 space-y-6 scrollbar-thin">
        <h2 className="text-xl md:text-3xl font-bold text-gray-full text-center md:w-[80%] mx-auto">
          Easily Identify Plants Features or Diseases.
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          <img src={ImageUpload} className="w-32" alt="Upload Image" />
          <Input className="bg-white" placeholder="What do you want to do with the image?" />
          <Button className="bg-primary-orange">Process Image</Button>
        </div>

        {/* Images Grid */}
        <Card className="p-4 shadow-inner w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center overflow-hidden bg-gray-neutral"
              >
                <img
                  src={plantImage1}
                  className="h-32 w-full object-cover"
                  alt="Plant Image"
                />
                <p className="text-gray-full text-start w-full px-2">
                  10 Sept. 2024
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Right-side section */}
      <div className="flex-1 h-full">
        <Card className="h-full p-8 flex flex-col items-center justify-center">
          <LoaderIcon className="animate-spin text-primary-orange mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-full">Processing Image</h3>
          <p className="text-lg font-medium text-gray-500">Please wait...</p>
        </Card>
      </div>
    </section>
  );
};

export default DashboardPlantIdentification;
