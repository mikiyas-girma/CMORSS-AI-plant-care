/**
 * Plant Journalling
 * @returns JSX Component for the view
 */

import { ImageUpload, plantImage1 } from "@/assets";
import CustomModal from "@/gui/components/common/CustomModal";
import FileUploader from "@/gui/components/dashboard-identify/FileUploader";
import Identification from "@/gui/components/dashboard-identify/Identification";
import Loading from "@/gui/components/dashboard-identify/Loading";
import { Button } from "@/gui/components/ui/button";
import { Card } from "@/gui/components/ui/card";
import { Input } from "@/gui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/gui/components/ui/select";
import { axiosForApiCall } from "@/lib/axios";
import { fileToBase64 } from "@/lib/fileToBase64";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PlantDetails {
  name: string;
  common_names: string[];
  description: string;
  best_light_condition: string;
  best_soil_type: string;
  best_watering: string;
  common_uses: string;
  cultural_significance: string;
  toxicity: string;
  url: string;
}
/**
 * Journal Layout within the Dashboard.
 * @returns JSX Component.
 */
const DashboardPlantIdentification = () => {
  const [identification, setIdentification] = useState<{
    loading?: boolean;
    error?: { message: string };
    data?: PlantDetails;
  }>();
  const [plant, setPlant] = useState<{
    loading?: boolean;
    error?: { message: string };
    data?: {
      name?: string;
      location?: string;
    };
  }>();

  const [files, setFiles] = useState<File[] | []>([]);
  const [plantImages, setPlantImages] = useState<string[]>([]);
  const [aiModel, setAiModel] = useState<"gemini" | "gpt">("gemini");
  const [isSave, setIsSave] = useState(false);
  const navigate = useNavigate();
  const handleProcess = async (model = "gemini") => {
    try {
      setIdentification({ loading: true });
      // Convert files to Base64 format
      const images = await Promise.all(
        files.map(async (file: File) => {
          return await fileToBase64(file);
        })
      );
      setPlantImages(images);
      console.log(model);

      const res = (
        await axiosForApiCall.post("/plants/identify", { images, model })
      ).data;

      setIdentification({
        loading: false,
        data: res,
        error: undefined,
      });
      setAiModel("gemini");
    } catch (e) {
      const error = e as AxiosError;
      setIdentification((prev) => ({
        ...prev,
        loading: false,
        error: { message: error.message },
      }));
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleTryAgain = () => {
    const model = aiModel === "gemini" ? "gpt" : "gemini";
    setAiModel((prev) => {
      console.log(prev, aiModel);
      return prev;
    });
    handleProcess(model);
    setAiModel(model);
  };

  const handleSave = async () => {
    setIsSave(true);
  };

  const handleCreate = async () => {
    try {
      setPlant((prev) => ({ ...prev, loading: true }));
      const data = {
        userId: "123",
        plantName: plant?.data?.name,
        images: plantImages,
        geoLocation: plant?.data?.location,
        details: identification?.data,
      };
      console.log(data);
      const res =
        plant && plant.data
          ? (await axiosForApiCall.post("/plants", data)).data
          : null;
      console.log(res);
      toast.success("Plant created successfully.");
      navigate("/dashboard/myplants");
    } catch (e) {
      const error = e as AxiosError;
      setPlant((prev) => ({
        ...prev,
        loading: false,
        error: { message: error.message },
      }));
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  // Return JSX Component
  return (
    <section className="p-3 sm:pl-0 lg:p-8 w-full flex flex-col lg:flex-row relative h-full">
      {/* Left scrollable section */}
      <div className="w-full lg:w-1/2 xl:w-2/5 lg:h-full flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden scrollbar-thin lg:pr-8 py-4">
        <h2 className="text-2xl xl:text-3xl font-bold text-gray-full text-center md:w-[80%] mx-auto">
          Easily Identify Plants Features or Diseases.
        </h2>
        <div className="flex flex-col items-center justify-center space-y-2 my-2 w-full">
          <img src={ImageUpload} className="w-32" alt="Upload Image" />
          <FileUploader files={files} setFiles={setFiles} />
          {files.length > 0 && (
            <Button
              onClick={() => handleProcess()}
              className="bg-primary-orange text-white"
            >
              Process Images
            </Button>
          )}
        </div>
        {/* Images Grid */}
        <p className="w-full text-center text-gray-full mt-2 hidden lg:block">
          Previous Plant Identifications
        </p>
        <Card className="hidden lg:block p-4 pb-2 shadow-inner w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            {[1, 2, 3].map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center overflow-hidden bg-gray-neutral"
              >
                <img
                  src={plantImage1}
                  className="h-full w-full object-cover"
                  alt="Plant Image"
                />
                <p className="text-gray-full text-start w-full px-2">
                  10 Sept. 2024
                </p>
              </Card>
            ))}
          </div>
          <p className="w-full text-center text-gray-full font-medium mt-4">
            See More
          </p>
        </Card>
      </div>

      {/* Right-side scrollable card */}
      <div className="flex-1 h-full flex flex-col justify-center relative">
        <Card className="p-8 flex-grow flex flex-col overflow-y-auto scrollbar-thin">
          {identification?.loading ? (
            <Loading />
          ) : identification?.error ? (
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-gray-full text-center">
                {identification.error.message}
              </p>
              <Button onClick={handleTryAgain}>Try Again</Button>
            </div>
          ) : identification?.data ? (
            <>
              <Identification
                handleSave={handleSave}
                identification={identification.data}
                image={plantImages[0]}
              />
            </>
          ) : (
            <>
              {files.length === 0 ? (
                <p className="text-gray-full text-center m-auto">
                  Add an image to get started
                </p>
              ) : (
                <>
                  <div className=" flex space-x-2 flex-wrap">
                    {files.map((file, index) => (
                      <div className="w-full overflow-hidden rounded-lg mb-4 flex-1 ">
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          className="h-44 object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 "
                          alt="Identified Plant"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-full text-center m-auto">
                    Note: click on Process Images in order to see the result
                  </p>
                </>
              )}
            </>
          )}
          {identification?.data && (
            <div className="flex flex-col items-center text-gray-700">
              <div className="flex items-center justify-center">
                <p className="text-sm">Not what you're looking for?</p>
                <Button
                  onClick={() => handleProcess("plantId")}
                  variant="ghost"
                  className="px-2 font-bold"
                >
                  Try Again
                </Button>
              </div>
              <div className="flex space-x-2">
                <p className="text-sm text-gray-900">Powered by </p>
                <a
                  href="https://plant.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/kindwise.png"
                    className="w-20"
                    alt="Kindwise Logo"
                  />
                </a>
              </div>
            </div>
          )}
        </Card>
      </div>

      {isSave && (
        <CustomModal
          closeModal={() => {
            setIsSave(false);
          }}
        >
          <Card className="p-8 min-h-full flex flex-col items-center justify-between space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {plantImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-md"
                >
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    className="w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-105"
                    alt={`Plant ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Plant Form */}
            <div className="w-full space-y-4">
              {/* Select Dropdown for Plant Name */}
              <div className="">
                <label htmlFor="plantName">Plant Name</label>
                <Select
                  onValueChange={(value) =>
                    setPlant((prev) => ({
                      ...prev,
                      data: { ...prev?.data, name: value },
                    }))
                  }
                  value={plant?.data?.name}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {identification?.data?.common_names &&
                        [
                          identification.data.name,
                          ...identification.data.common_names,
                        ].map((name, index) => (
                          <SelectItem key={index} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Input for Plant Location */}
              <div className="">
                <label htmlFor="plantLocation">Plant Location</label>
                <Input
                  id="plantLocation"
                  placeholder="Location"
                  className="w-full"
                  onChange={(e) =>
                    setPlant((prev) => ({
                      ...prev,
                      data: { ...prev?.data, location: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 w-full">
              <Button
                onClick={() => {
                  setIsSave(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                className="bg-primary-orange text-white hover:bg-orange-500"
              >
                Create Plant
              </Button>
            </div>
          </Card>
        </CustomModal>
      )}
    </section>
  );
};

export default DashboardPlantIdentification;
