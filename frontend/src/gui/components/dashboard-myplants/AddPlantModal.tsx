import React, { useState, useEffect } from "react";
import CustomModal from "../common/CustomModal";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, ArrowLeftIcon } from "lucide-react";
import FileUploader from "../dashboard-identify/FileUploader";
import Map from "./Map";

interface LatLong {
  lat: number;
  lng: number;
}

const AddPlantModal = ({
  closeModal,
  setPlantData,
  handleAdd,
  onCancel,
  loading,
  files,
  setFiles,
  plantData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [latlong, setLatlong] = useState<LatLong | null>(null);
  const [errors, setErrors] = useState<{ plantName?: string }>({});

  useEffect(() => {
    if (latlong) {
      setPlantData((prev) => ({
        ...prev,
        geoLocation: JSON.stringify(latlong),
      }));
    }
  }, [latlong, setPlantData]);

  const validatePlantName = () => {
    if (!plantData?.plantName.trim()) {
      setErrors({ plantName: "Plant name is required" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validatePlantName()) {
      setCurrentPage(2);
    }
  };

  return (
    <CustomModal closeModal={closeModal}>
      <Card className="relative p-8 min-h-full flex flex-col items-center justify-between space-y-8 bg-white shadow-lg rounded-lg w-1/3">
        {currentPage === 2 && (
          <div
            className="absolute top-4 left-4 cursor-pointer text-gray-600"
            onClick={() => setCurrentPage(1)}
          >
            <ArrowLeftIcon size={24} />
          </div>
        )}

        {currentPage === 1 ? (
          <>
            <FileUploader files={files} setFiles={setFiles} disabled={false} />

            <div className="grid grid-cols-2 gap-4 w-full">
              {files.length === 0 ? (
                <div className="col-span-2 text-center text-gray-500">
                  <p className="text-lg">No images uploaded</p>
                </div>
              ) : (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-32 object-cover transition-transform duration-300 transform group-hover:scale-110"
                      alt={`Plant ${index + 1}`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">
                        Plant Image {index + 1}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="plantName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Plant Name
              </label>
              <Input
                id="plantName"
                placeholder="Enter Plant Name"
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-green"
                onChange={(e) =>
                  setPlantData((prev) => ({
                    ...prev,
                    plantName: e.target.value,
                  }))
                }
                value={plantData?.plantName || ""}
              />
              {errors.plantName && (
                <p className="text-red-500 text-sm mt-1">{errors.plantName}</p>
              )}
            </div>

            <div className="space-x-4 w-full mt-6">
              <Button
                onClick={handleNext}
                className="bg-primary-orange text-white hover:bg-orange-500 rounded-lg transition-all w-full"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <label
                htmlFor="plantLocation"
                className="block text-gray-700 font-semibold mb-2"
              >
                Plant Location
              </label>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <Map latlong={latlong} setLatlong={setLatlong} />
              </div>
            </div>

            <div className="flex justify-end space-x-4 w-full mt-6">
              <Button
                onClick={onCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                className="bg-primary-orange text-white hover:bg-orange-500 rounded-lg flex items-center space-x-2 transition-all"
                disabled={loading}
              >
                <span>Create Plant</span>
                <Loader2Icon
                  className={`animate-spin transition-all duration-300 ${
                    loading ? "opacity-100 max-w-[24px]" : "opacity-0 max-w-0"
                  } overflow-hidden`}
                />
              </Button>
            </div>
          </>
        )}
      </Card>
    </CustomModal>
  );
};

export default AddPlantModal;
