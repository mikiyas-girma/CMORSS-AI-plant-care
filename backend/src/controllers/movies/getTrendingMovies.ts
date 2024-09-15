import axios from 'axios';
import { Request, Response } from 'express';
import { TrendingMoviesResponse } from '../../types/movies/movies.types';

const apiKey = process.env.TMDB_API_KEY || '';
const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

/**
 * Get Trending Movies for dashboard
 * @param req
 * @param res
 */
export async function getTrendingMovies(req: Request, res: Response) {
  try {
    const response = await axios.get<TrendingMoviesResponse>(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    // Remove the Person Trend and keep only Movies and TV Shows
    const filteredMoviesAndShow = response.data.results.filter(
      (movie) => movie.media_type !== 'person'
    );

    // Reform the Data with the URL for frontend access
    const moviesWithFullPaths = filteredMoviesAndShow.map((movie) => ({
      ...movie,
      backdrop_path: movie.backdrop_path
        ? `${imageBaseUrl}${movie.backdrop_path}`
        : null,
      poster_path: movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : null,
      details_url: `https://www.themoviedb.org/movie/${movie.id}`,
    }));

    res.status(200).json({
      message: 'Retrieved trending movies successfully',
      movies: moviesWithFullPaths,
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    res.status(500).json({
      message: 'Error: Failed to fetch trending movies',
      movies: null,
    });
  }
}
