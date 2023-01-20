import { Route, Routes, useParams } from "react-router-dom";
import Movie from "./components/movie";
import Navbar from "./components/navbar";
import MovieDetailPage from "./components/movieDetailedPage";
import EpisodeDetailedPage from "./components/episodeDetailedPage";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Movie/>}/>
      <Route path="/movie/:movieId" element={<MovieDetailPage/>}/>
      <Route path="/episodes/:episodeId" element={<EpisodeDetailedPage/>} />
      </Routes>
    </div>
  );
}

export default App;
