/* eslint-disable @typescript-eslint/no-explicit-any */
import { Droplets, CloudRainWind } from '@/assets/Icons';

import InfoComp from './InfoComp';
import { useEffect, useState } from 'react';
import useGeolocation from '@/hooks/useGeoLocatioin';
import axios from 'axios';
import { capitalizeWords, formatTemperature } from '@/lib/utils';
import { WeatherData } from '@/types';
import { CircleAlert, Wind } from 'lucide-react';

import { format } from 'date-fns';
import { getWeatherImage } from '@/lib/getWeatherImage';
import { ServerURL } from '@/lib/SERVERURL';
import LoadingComp from '../common/LoadingComp';

const WeatherWidget = () => {
  const [loading, setLoading] = useState(true);
  const { longitude, latitude } = useGeolocation();
  const [data, setData] = useState<WeatherData>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!longitude) return;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await axios.get(`${ServerURL}/dashboard/weather-data`, {
          params: { longitude, latitude },
        });

        const _data = res.data.data;
        setData(_data);

        // Catch Error
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log('An Error occured. Check network connection.');
        }
        setData(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, [latitude, longitude]);

  //   Return JSX
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-primary-green bg-[url(/cloud_bg.png)] bg-cover object-cover p-3 py-4 text-white w-full lg:w-auto">
      {loading && (
        <LoadingComp
          message="Loading Weather"
          iconType="ring"
          iconColor="white"
          className="h-[100%] w-full"
        />
      )}

      {loading && error && (
        <div className="flex h-[200px] w-[200px] flex-col items-center justify-center text-white">
          <CircleAlert size={36} className="" />

          <p className="text-xs">Error loading weather...</p>
        </div>
      )}

      {/* Return widget data */}
      {!loading && data && (
        <>
          <p className="text-base">
            <span>
              {data.name}, {data.sys.country}
            </span>
            <span> | </span>
            <span>{data.weather[0].main}</span>
          </p>

          <div className="flex items-center justify-center gap-1">
            {/* Cloud Image */}
            <div className="w-[30%] min-w-[110px] max-w-[110px]">
              <img
                src={getWeatherImage(data.weather[0].icon)}
                alt="Sun Cloud"
              />
            </div>

            {/* Temparatur Rating */}
            <div className="">
              <div className="-mb-1 flex">
                <h2 className="text-6xl font-semibold">
                  {formatTemperature(data.main.temp)}
                </h2>
                <p className="subs">
                  <span className="align-super">o</span>
                  <span className="text-lg"> C</span>
                </p>
              </div>
              <p>{capitalizeWords(data.weather[0].description)}</p>
            </div>
          </div>

          {/* Weather mini information */}
          <div className="flex w-[80%] justify-center gap-4">
            <InfoComp Icon={Droplets} value={`${data.main.humidity}%`} />
            <InfoComp
              Icon={CloudRainWind}
              value={`${data.wind.speed.toFixed(1)} m/s`}
            />
            <InfoComp Icon={Wind} value={`${data.main.pressure}hPa`} />
          </div>

          {/* Sunrise Setup */}
          <div className="my-2 flex gap-3 text-sm font-semibold">
            <p>Sunrise: {format(new Date(data.sys.sunrise * 1000), 'HH:mm')}</p>
            <p>Sunset: {format(new Date(data.sys.sunset * 1000), 'HH:mm')}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
