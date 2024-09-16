/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/gui/components/dashboard-myplants/Table";
import { BotMessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { PlantData } from "@/types";
import { LoaderCircle } from "@/assets/Icons";
import useToasts from "@/hooks/useToasts";
import { axiosForApiCall } from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function Component() {
  const [data, setData] = useState<PlantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAuth().user.data;
  const { toastError } = useToasts();

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        setLoading(true);
        const res = (await axiosForApiCall.get(`/plants/${user.id}`)).data;
        setData(res);
      } catch (error: any) {
        if (error.message === 401) {
          toastError(error.message);
        } else {
          toastError("An Error occured. Check network connection.");
        }
      } finally {
        setLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <LoaderCircle
            size={36}
            className="animate-spin duration-300 ease-linear"
          />
          <p className="text-xs">Loading plant data...</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Plant Name</TableHead>
            <TableHead className="hidden sm:table-cell">Location</TableHead>
            <TableHead className="">Get Help</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-muted/100" : ""}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.plantName}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {item.geoLocation}
              </TableCell>
              <TableCell className="text-right">
                {/* this will be changed to route to chat with this plant  */}
                <Link
                  to={`/dashboard/chat/${item._id}`}
                  className="text-primary"
                >
                  <BotMessageSquare className="w-10 h-7" color="green" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
