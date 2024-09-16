/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Plant of the Day Component
 * @returns 

 */

import { PlantFact } from '@/types';
import { useEffect, useState } from 'react';
import LoadingComp from '../common/LoadingComp';
import { axiosForApiCall } from '@/lib/axios';

const PlantOfTheDay = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PlantFact>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axiosForApiCall.get(`/dashboard/daily-fact`);
        setData(res.data);
      } catch (error: any) {
        if (error.response) {
          console.log('');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Return JSX To View
  return (
    <section className="min-h-[200px] sm:min-w-[300px] flex-grow rounded-xl bg-primary-orange w-[50%] p-7">
      {loading && (
        <div className="flex h-[200px] w-[200px] flex-col items-center justify-center text-white mx-auto">
          <LoadingComp
            message="Loading Plant of the Day"
            iconType="ring"
            iconColor="white"
            className="h-[100%] w-full mx-auto"
          />
        </div>
      )}

      {/* Unable to retrieve */}
      {!loading && !data && <div>Unable to retrieve data....</div>}
      {!loading && data && (
        <div className="flex h-full items-center flex-wrap gap-3">
          <div className="flex flex-col gap-2 text-white text-center md:text-left  md:w-[46%]">
            <h3 className="text-xs font-semibold">Plant Fact of the Day</h3>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <p>{data.description}</p>
          </div>
          {/* Plant Image */}
          <div className="w-full md:w-[50%]  max-w-[300px]  object-cover rounded-2xl overflow-hidden shadow-xl hover:scale-90 transition-transform ease-in-out duration-300 mx-auto max-h-[200px]">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full hover:scale-125 transition-transform ease-in-out duration-300 object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PlantOfTheDay;
