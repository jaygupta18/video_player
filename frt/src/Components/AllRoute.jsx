import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import PlayVideo from "../Pages/PlayVideo";
import Search from "../Pages/Search";
import Login from "../Pages/Login";
import UploadData from "../Pages/UploadData";
import PrivateRoute from "./PrivateRoute";
import YourVideos from "../Pages/YourVideos";
import Broadcast from "./Broadcasts.jsx";
import WatchBroadcast from "./WatchBroadcast.jsx"
import LiveBroadcasts from "./LiveBroadcasts.jsx";
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
        <Route
        path="/live"
        element={<Broadcast/>}
        />
         <Route path="/live-broadcasts" element={<LiveBroadcasts />} />
         <Route path="/broadcast/:broadcastId" element={<WatchBroadcast />} />
      </Routes>
    </div>
  );
}
