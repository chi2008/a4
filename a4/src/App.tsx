import { MainLayout } from '@/layouts/MainLayout';
import { CreditsView, ErrorView, HomeView, MovieView, Movies, ReviewsView} from '@/views';
import { Route, Routes } from 'react-router-dom';
import { Television } from './views/tv/Television';
import { TelevisionView } from './views/tv/TelevisionView';
import { TelevisionCredits } from './views/tv/TelevisionCreadits';
import { TelevisionReviews } from './views/tv/TelevisionReviews';
import { SeasonView } from './views/tv/SeasonView';
import { EpisodeView } from './views/tv/SeasonNumber';
import { TrendingMovieView } from './views/trending/TrendingMovewView';
import { PersonView } from './views/person/PersonView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/Movies" element={<Movies />} />
        <Route path='/Trending/movies' element={<TrendingMovieView/>}/>

        <Route path='/Person/:id' element={<PersonView/>}>
          <Route path="career" element={<CreditsView />} />
          <Route path="image" element={<CreditsView />} />
        </Route>

        <Route path='/Television' element={<Television/>}/>

        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="/tv/:id" element={<TelevisionView />}>
          <Route path="seasons" element={<SeasonView />} />
          <Route path="season/:seasonNumber" element={<EpisodeView />} />
          <Route path="tvcredits" element={<TelevisionCredits />} />
          <Route path="tvreviews" element={< TelevisionReviews/>}/>
        </Route>
        
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
