export type GridData = {
  id: number;
  imagePath: string | null;
  primaryText: string;
  secondaryText?: string;
};
export type ChangeType = 'tv' | 'movie'| 'person';

export type SearchResultItem ={
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  name?: string;
  profile_path?: string;
  known_for_department?: string;
}

export type ShResponse = {
  page: number;
  results: SearchResultItem[];
  total_pages: number;
  total_results: number;
}

export type ImageCell = {
  id: number;
  imagePath: string;
  primaryText: string;
  secondaryText?: string;
  media?: ChangeType;
};


export type MovieRepsonse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type TvResponse = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: string;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type SeasonResponse = {
  seasons: Array<{
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    air_date: string;
    season_number: number|string;
    episode_count: number|string;
  }>;
};
export type EpisodeResponse = {
  episodes: Array<{
    id: number;
    name: string;
    overview: string;
    still_path: string;
    air_date: string;
    episode_number: number;
  }>;
};

export type MediaResponse = {
  results: Array<{
    id: number;
    original_title?: string;
    name?: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type PersonResponse ={
  id: number;
  name: string;
  profile_path: string;
  birthday: string;
  biography: string;
}

export type CareerResponse = {
  cast: Array<{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    character: string;
  }>;
};

export type ImageResponse = {
  profiles: Array<{
    id: number;
    name: string;
    file_path: string;
    character: string;
  }>;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export type DetailRepsonse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type SearchResponse = {
  results: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};
