/* eslint-disable @typescript-eslint/no-explicit-any */
import useToasts from '@/hooks/useToasts';
import { axiosForApiCall } from '@/lib/axios';
import { Movie } from '@/types/movie';

import { useEffect, useState } from 'react';
import TrendingList from './TrendingList';

/**
 * Trending Movies
 * @returns Trending Movies to the Nav Bar
 */
const TrendingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showList, setShowList] = useState(false);

  const { toastError } = useToasts();

  useEffect(() => {
    (async function getMovies() {
      try {
        const res = await axiosForApiCall('/user/trending-movies');
        const data = res.data;

        setMovies(data.movies);
      } catch (error: any) {
        if (error.response) {
          toastError(error.response?.data?.message);
        } else {
          toastError('Error occured. Unable to connect to server.');
        }
      }
    })();
  }, [toastError]);

  // Return Button and Conditionally Trending List Modal
  return (
    <>
      <div className="px-2 py-3 rounded-md  cursor-pointer hover:bg-green-500 transition-all ease ease-in-out duration-500 active:scale-75 select-none">
        <button onClick={() => setShowList(true)}>
          <p className="text-xs text-left">😃 Wanna take a Break?</p>
          <h2 className="text-slate-800 font-medium hover:underline">
            View Trending Movie List
          </h2>
        </button>
      </div>

      {/* Show the Trending Movies List when teh button is clicked */}
      {showList && (
        <TrendingList movies={movies} setShowList={() => setShowList(false)} />
      )}
    </>
  );
};

export default TrendingMovies;
