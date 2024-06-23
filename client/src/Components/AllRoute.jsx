// Packages

import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import PlayVideo from "../Pages/PlayVideo";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import UploadData from "../Pages/UploadData";
import PrivateRoute from "./PrivateRoute";
import YourVideos from "../Pages/YourVideos";

export default function AllRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<PlayVideo target={"videos"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="search/:query" element={<Search />} />
        <Route
          path="/upload"
          element={<PrivateRoute component={UploadData} />}
        />
        <Route
          path="/your-videos"
          element={<PrivateRoute component={YourVideos} />}
        />

        <Route
          path="/uploads/:id"
          element={<PrivateRoute component={PlayVideo} target={"uploads"} />}
        />
      </Routes>
    </div>
  );
}
