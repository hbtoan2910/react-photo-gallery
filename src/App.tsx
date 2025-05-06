import "font-awesome/css/font-awesome.min.css";
import HomePage from "./components/HomePage/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PhotoPage from "./components/PhotoPage/PhotoPage";
import VideoPage from "./components/VideoPage/VideoPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/photo" element={<PhotoPage />} />
          <Route path="/video" element={<VideoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
