import { Movie } from '@/types/movie';
import React from 'react';
import ImageWithPlaceholder from './ImageWithPlaceHolder';
import LoadingComp from './LoadingComp';
import { Link } from 'react-router-dom';

type CardType = {
  movie: Movie;
};
const MovieCard: React.FC<CardType> = ({ movie }) => {
  // Return JSX
  return (
    <>
      <div className="absolute top-0 left-0 bg-black opacity-0 hover:opacity-90 w-full h-full transition-all duration-500 ease-in-out text-white flex justify-end flex-col px-8 gap-3 pb-5 cursor-default">
        <h3 className="text-4xl font-black">{movie.original_title}</h3>
        <p>{movie.overview}</p>
        <div className="flex gap-2">
          <p>Votes: {movie.vote_count}</p>
          <p>Rating:{'⭐'.repeat(parseInt(movie.vote_average + ''))}</p>
        </div>
        <p>Released:{movie.release_date}</p>
        <Link
          to={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-green px-5 py-2 hover:bg-primary-orange hover:text-slate-900"
        >
          View Site
        </Link>
      </div>
      <ImageWithPlaceholder
        imgUrl={movie.poster_path!}
        altText={movie.original_title}
        LoadingComponent={<LoadingComp message="Loading" />}
      />
    </>
  );
};

export default MovieCard;
