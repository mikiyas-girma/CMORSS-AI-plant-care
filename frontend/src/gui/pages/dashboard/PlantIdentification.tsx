/**
 * Plant Journalling
 * @returns JSX Component for the view
 */

import { ImageUpload } from "@/assets";
import CustomModal from "@/gui/components/common/CustomModal";
import CreatePlantCard from "@/gui/components/dashboard-identify/CreatePlantCard";
import FileUploader from "@/gui/components/dashboard-identify/FileUploader";
import Identification from "@/gui/components/dashboard-identify/Identification";
import IdentificationFooter from "@/gui/components/dashboard-identify/IdentificationFooter";
import IdentificationPlaceholder from "@/gui/components/dashboard-identify/IdentificationPlaceholder";
import Loading from "@/gui/components/dashboard-identify/Loading";
import RecentPlaceholder from "@/gui/components/dashboard-identify/RecentPlaceholder";
import { Button } from "@/gui/components/ui/button";
import { Card } from "@/gui/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { axiosForApiCall } from "@/lib/axios";
import { fileToBase64 } from "@/lib/fileToBase64";
import { AxiosError } from "axios";
import { Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Plant {
  _id: string;
  userId: string;
  plantName: string;
  plantImages: string[];
  geoLocation: string;
  details: PlantDetails;
  createdAt: string;
}
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

interface Query<T> {
  loading?: boolean;
  error?: { message: string };
  data?: T;
}
/**
 * Journal Layout within the Dashboard.
 * @returns JSX Component.
 */
const DashboardPlantIdentification = () => {
  const [identification, setIdentification] = useState<Query<PlantDetails>>();
  const [plant, setPlant] = useState<
    Query<{
      name?: string;
      location?: string;
    }>
  >();
  const [recentPlants, setRecentPlants] = useState<Query<Plant[]>>({
    data: [],
  });

  const [files, setFiles] = useState<File[] | []>([]);
  const [plantImages, setPlantImages] = useState<string[]>([]);
  const [aiModel, setAiModel] = useState<"gemini" | "gpt">("gemini");
  const [isSave, setIsSave] = useState(false);

  const navigate = useNavigate();
  const user = useAuth().user.data;

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

      const plantDetails = {
        ...res,
        url: res.url ? res.url : "https://en.wikipedia.org/wiki/" + res.name,
      };
      setIdentification({
        loading: false,
        data: plantDetails,
        error: undefined,
      });
      setFiles([]);
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
    setPlant((prev) => ({
      ...prev,
      data: { ...prev?.data, name: identification?.data?.name },
    }));
    setIsSave(true);
  };

  const handleNew = () => {
    setIdentification({ data: undefined });
    setFiles([]);
  };

  const handleCreate = async () => {
    if (!user) return;
    try {
      setPlant((prev) => ({ ...prev, loading: true }));
      const data = {
        userId: user.id,
        plantName: plant?.data?.name,
        plantImages: plantImages,
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

  useEffect(() => {
    if (!user) return;
    const getPlants = async () => {
      try {
        setRecentPlants((prev) => ({
          ...prev,
          loading: true,
        }));
        const plants = (await axiosForApiCall(`/plants/${user.id}`)).data;
        setRecentPlants({
          error: undefined,
          loading: false,
          data: plants,
        });
      } catch (e) {
        const error = e as AxiosError;
        setRecentPlants({
          error: { message: error.message },
          loading: false,
          data: undefined,
        });
        console.log(error);
      }
    };
    getPlants();
  }, [user]);

  useEffect(() => {
    if (!identification?.data)
      setIdentification({ data: undefined, error: undefined, loading: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
          <FileUploader
            files={files}
            setFiles={setFiles}
            disabled={identification?.loading || identification?.data}
          />
        </div>
        {/* Images Grid */}
        {recentPlants.data && recentPlants.data?.length > 0 && (
          <p className="w-full text-center text-gray-full mt-2 hidden lg:block">
            Previous Plant Identifications
          </p>
        )}
        <Card className="hidden lg:block p-4 pb-2 shadow-inner w-full">
          {recentPlants.loading ? (
            <Loader2Icon
              className="animate-spin text-primary-orange m-auto"
              size={32}
            />
          ) : recentPlants.error ? (
            <p className="text-gray-full text-center">
              {recentPlants.error.message}
            </p>
          ) : recentPlants.data?.length === 0 ? (
            <RecentPlaceholder />
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              {recentPlants.data &&
                recentPlants.data?.slice(0, 4).map((recentPlant) => (
                  <Card
                    key={recentPlant._id}
                    className="flex flex-col items-center justify-center overflow-hidden bg-gray-neutral hover:cursor-pointer"
                    // onClick={() => navigate(`/dashboard/myplants/${recentPlant._id}`)}
                    onClick={() => navigate(`/dashboard/myplants`)}
                  >
                    <img
                      src={recentPlant.plantImages[0]}
                      className="h-full w-full object-cover"
                      alt="Plant Image"
                    />
                    <p className="text-gray-full text-start w-full px-2 truncate">
                      {recentPlant.plantName}
                    </p>
                  </Card>
                ))}
            </div>
          )}
          {recentPlants?.data && recentPlants.data.length > 4 && (
            <Link to="/dashboard/myplants">
              <p className="text-center text-gray-full font-medium mt-4">
                View All
              </p>
            </Link>
          )}
        </Card>
      </div>
      {/* Right-side scrollable card */}
      <div className="flex-1 h-full flex flex-col justify-center relative">
        <Card className="p-8 flex-grow flex flex-col overflow-y-auto scrollbar-thin">
          {identification?.data ? (
            <Identification
              handleSave={handleSave}
              handleNew={handleNew}
              identification={identification.data}
              image={plantImages[0]}
            />
          ) : (
            <>
              {files.length === 0 ? (
                <IdentificationPlaceholder />
              ) : (
                <div className={`flex h-full flex-col justify-between`}>
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 w-full">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="relative group overflow-hidden rounded-lg shadow-lg"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="h-44 w-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                          alt="Identified Plant"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 absolute top-2 right-2 p-1 bg-red-100 rounded-full"
                          disabled={identification?.loading}
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                        <p className="absolute bottom-0 w-full bg-white bg-opacity-70 text-center py-1 text-sm truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  {identification?.loading ? (
                    <div className="w-full flex flex-col items-center justify-center">
                      <Loading single={files.length === 1} />
                    </div>
                  ) : (
                    identification?.error && (
                      <div className="space-y-2 flex flex-col items-center">
                        <p className="text-gray-full text-center">
                          {identification.error.message}
                        </p>
                      </div>
                    )
                  )}
                  <div className="w-full flex spacexflex space-x-4 justify-center">
                    <Button
                      onClick={
                        identification?.error
                          ? handleTryAgain
                          : () => handleProcess()
                      }
                      className="bg-primary-orange text-white w-full"
                      disabled={identification?.loading}
                    >
                      {identification?.loading ? (
                        <Loader2Icon size={24} className=" animate-spin" />
                      ) : identification?.error ? (
                        "Try Again"
                      ) : (
                        `Process Image${files.length > 1 ? "s" : ""}`
                      )}
                    </Button>
                    {identification?.error && (
                      <Button
                        onClick={handleNew}
                        className="bg-secondary-blue hover:bg-cyan-700 w-full"
                      >
                        Identify new Plant
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          {identification?.data && (
            <IdentificationFooter onTryAgain={() => handleProcess("plantId")} />
          )}
        </Card>
      </div>

      {isSave && (
        <CustomModal
          closeModal={() => {
            setIsSave(false);
          }}
        >
          <CreatePlantCard
            plantImages={plantImages}
            identification={identification}
            setPlant={setPlant}
            onCancel={() => {
              setIsSave(false);
            }}
            onCreate={handleCreate}
            loading={plant?.loading}
          />
        </CustomModal>
      )}
    </section>
  );
};

export default DashboardPlantIdentification;
