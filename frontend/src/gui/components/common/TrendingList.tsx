import React from 'react';

import { Movie } from '@/types/movie';
import CustomModal from './CustomModal';
import ReusableCarousel from './ReusableCarousel';
import MovieCard from './MovieCard';

type ListType = {
  movies: Movie[];
  setShowList: () => void;
};

const TrendingList: React.FC<ListType> = ({ movies, setShowList }) => {
  // Define Function that returns the Card
  const renderMovie = (movie: Movie) => <MovieCard movie={movie} />;

  return (
    <CustomModal
      closeModal={setShowList}
      overlayColor="bg-black bg-opacity-[90%]"
      positionCloseButton="left"
      className=""
    >
      <div className="relative flex h-full w-full max-w-[1330px] flex-col justify-center gap-5 md:scale-90">
        {/* Page header */}

        <div className="w-full text-center  text-white mb-4">
          <h2 className="text-5xl font-bold md:px-10 md:w-[80%] mx-auto text-primary-orange">
            Discover the most Popular movies of the moment
          </h2>
          <p className="text-xl mt-2">
            Catch the latest buzz in the movie world.
          </p>
        </div>

        {/* Render Carousel */}
        <ReusableCarousel
          items={movies}
          renderItem={renderMovie}
          autoPlay={true}
          autoPlayInterval={5000} // in milliseconds i.e 5,000 === 5s
          pauseOnHover={true}
          cardWidth="min-w-[320px] md:min-w-[400px]"
          containerClassName="px-10"
          cardClassName="mb-6"
        />
      </div>
    </CustomModal>
  );
};

export default TrendingList;
