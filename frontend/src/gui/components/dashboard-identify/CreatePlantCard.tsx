import React from "react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

const CreatePlantCard = ({
  plantImages,
  identification,
  setPlant,
  onCancel,
  onCreate,
  loading,
}) => {
  return (
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
            defaultValue={identification?.data?.name}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {identification?.data?.common_names &&
                  [
                    ...new Set([
                      identification.data.name,
                      ...identification.data.common_names,
                    ]),
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
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700"
        >
          Cancel
        </Button>
        <Button
          onClick={onCreate}
          className="bg-primary-orange text-white hover:bg-orange-500 flex items-center"
          disabled={loading}
        >
          Create Plant
          <Loader2Icon
            className={`animate-spin ml-2 transition-all duration-300 ${
              loading ? "opacity-100 max-w-[24px]" : "opacity-0 max-w-0"
            } overflow-hidden`}
            size={24}
          />
        </Button>
      </div>
    </Card>
  );
};

export default CreatePlantCard;
