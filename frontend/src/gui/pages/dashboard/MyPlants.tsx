import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/gui/components/dashboard-myplants/Table";
import { BotMessageSquare, Pencil, Sprout, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LoaderCircle } from "@/assets/Icons";
import useToasts from "@/hooks/useToasts";
import { axiosForApiCall } from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setChatResponse, setAnalyzing } from "@/redux/chat/chatSlice";

import { Card } from "@/gui/components/ui/card";
import { Button } from "@/gui/components/ui/button";
import { Plant } from "@/types";
import DeletePlantModal from "@/gui/components/dashboard-myplants/DeletePlantModal";
import { toast } from "sonner";
import AddPlantModal from "@/gui/components/dashboard-myplants/AddPlantModal";
import MyPlantsPlaceholder from "@/gui/components/dashboard-myplants/MyPlantsPlaceholder";
import { fileToBase64 } from "@/lib/fileToBase64";
import { Link } from "react-router-dom";

export default function Component() {
  const [data, setData] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletePlant, setDeletePlant] = useState<{
    plantId?: string;
    loading?: boolean;
  }>();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [plantData, setPlantData] = useState<Plant>();
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const user = useAuth().user;
  const { toastError } = useToasts();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data is ready and available
    if (user.isProcessing || !user.data?._id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = (await axiosForApiCall.get(`/plants/${user.data?._id}`))
          .data;
        setData(res); // Store fetched plant data
      } catch (error: any) {
        if (error.response?.status === 401) {
          toastError("Unauthorized");
        } else {
          toastError("An error occurred. Check your network connection.");
        }
      } finally {
        setLoading(false); // Stop loading state after API request is completed
      }
    };

    fetchData(); // Fetch data once user is authenticated and the component is ready
  }, [user]);

  if (user.isProcessing || loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle
          size={36}
          className="animate-spin duration-300 ease-linear"
        />
        <p className="text-xs">Loading plant data...</p>
      </div>
    );
  }

  const getCareAdvice = async (item) => {
    try {
      setAnalyzing(true);
      const response = await axiosForApiCall.post(`/chat/${item._id}`, {
        userQuery: {
          chatId: uuidv4(),
          plantName: item.plantName,
          location: item.geoLocation,
        },
      });
      dispatch(setChatResponse(response.data.response));
      navigate(`/dashboard/chat/${item._id}`);
    } catch (error) {
      console.log("Error fetching plant care advice !!!", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeletePlant((prev) => ({ ...prev, loading: true }));
      await axiosForApiCall.delete(`/plants/${deletePlant?.plantId}`);
      setData((prev) =>
        prev.filter((item) => item._id !== deletePlant?.plantId)
      );
      toast.success("Plant deleted successfully");
    } catch (error: any) {
      if (error.message === 401) {
        toastError(error.message);
      } else {
        toastError("An Error occured. Check network connection.");
      }
    } finally {
      setDeletePlant((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleAdd = async () => {
    if (!user) return;
    try {
      setLoadingAdd(true);
      const plantImages = await Promise.all(
        files.map(async (file: File) => {
          return await fileToBase64(file);
        })
      );
      const data = {
        userId: user.data?._id,
        plantImages,
        ...plantData,
      };
      await axiosForApiCall.post(`/plants`, data);
      toast.success("Plant added successfully");
      setIsAdd(false);
      setPlantData(undefined);
      setFiles([]);
    } catch (error: any) {
      if (error.message === 401) {
        toastError(error.message);
      } else {
        toastError("An Error occured. Check network connection.");
      }
    } finally {
      setLoadingAdd(false);
    }
  };
  return (
    <div className="p-8 w-full">
      <Card>
        {data.length > 0 && (
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-semibold">My Plants</h1>
            <Button
              onClick={() => setIsAdd(true)}
              className="bg-primary-green hover:bg-green-700"
            >
              Add Plant
            </Button>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-44">
            <LoaderCircle
              size={36}
              className="animate-spin duration-300 ease-linear"
            />
            <p className="text-xs">Loading plant data...</p>
          </div>
        ) : data.length === 0 ? (
          <MyPlantsPlaceholder handleAdd={() => setIsAdd(true)} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Plant Name</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-muted/100" : ""}
                >
                  <TableCell className="font-medium">
                    {item.plantImages && item.plantImages[0] ? (
                      <img src={item.plantImages[0]} className="rounded-md" />
                    ) : (
                      <Sprout className="w-6 h-6 text-primary-green mx-auto" />
                    )}
                  </TableCell>
                  <TableCell>{item.plantName}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.geoLocation}
                  </TableCell>
                  <TableCell className="text-right ">
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => setDeletePlant({ plantId: item._id })}
                        className="p-1 bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="w-6 h-6 text-white" />
                      </Button>
                      <Button className="p-1 bg-primary-green hover:bg-green-700">
                        <Pencil className="w-6 h-6 text-white" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/chat/${item._id}`}
                      onClick={() => getCareAdvice(item)}
                      className="font-space_grotesk  italic text-green-500 text-primary group flex flex-col items-center" // Flexbox for alignment
                      style={{ height: "60px" }} // Adjust this height based on your layout
                    >
                      <p className="invisible group-hover:visible">
                        Get Advice From AI
                      </p>{" "}
                      <BotMessageSquare className="w-10 h-7" color="green" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      {deletePlant?.plantId && (
        <DeletePlantModal
          closeModal={() =>
            setDeletePlant((prev) => ({ ...prev, plantId: undefined }))
          }
          handleDelete={handleDelete}
        />
      )}
      {isAdd && (
        <AddPlantModal
          closeModal={() => setIsAdd(false)}
          setPlantData={setPlantData}
          plantData={plantData}
          handleAdd={handleAdd}
          loading={loadingAdd}
          onCancel={() => setIsAdd(false)}
          files={files}
          setFiles={setFiles}
        />
      )}
    </div>
  );
}
