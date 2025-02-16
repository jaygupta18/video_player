import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleVideo } from "../API/fetchData";
import PlaySingleVideo from "../Components/PlaySingleVideo";

export default function PlayVideo({ target }) {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const getVideo = async () => {
    console.log(target,id);
    const videoData = await getSingleVideo(target, id);  
    setVideo(videoData);
    
  }; 
  useEffect(() => {
    getVideo();
  }, []);
  return (
    <div className="PlayVideo">
      <PlaySingleVideo {...video} key={id} />
    </div>
  );
}
    