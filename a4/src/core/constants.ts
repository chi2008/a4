export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const ORIGINAL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/movie';
export const NOW_PLAYING_ENDPOINT = 'https://api.themoviedb.org/3/movie/now_playing';
export const MOVIE_POPULAR_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';
export const MOVIE_TOP_RATED_ENDPOINT = 'https://api.themoviedb.org/3/movie/top_rated';
export const MOVIE_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming';

export const SEARCH_MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';

export const TV_ENDPOINT = 'https://api.themoviedb.org/3/tv';
export const TV_AIRING_TODAY ='https://api.themoviedb.org/3/tv/airing_today'
export const TV_ON_THE_AIR ='https://api.themoviedb.org/3/tv/on_the_air'
export const TV_POPUALR = 'https://api.themoviedb.org/3/tv/popular'
export const TV_TOP_RATED ='https://api.themoviedb.org/3/tv/top_rated'
export const TV_DETAIL_ENDPOINT = (id: string | number) => `https://api.themoviedb.org/3/tv/${id}`;
export const TV_SEASONNUMBER_ENDPOINT = (series_id: string | number, season_number: string | number) => `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}`;

export const MOVIE_TRENDING = 'https://api.themoviedb.org/3/trending/movie'
export const TV_TRENDING ='https://api.themoviedb.org/3/trending/tv/'

export const PERSON ='https://api.themoviedb.org/3/person/'
