// Packages
import React, { useEffect, useState } from "react";

import { Box, Button, Image, Text } from "@chakra-ui/react";
import SideCards from "./SideCards";
import SideLinks from "./SideLinks";

export default function PlaySingleVideo({
  id,
  title,
  thumbnailUrl,
  duration,
  uploadTime,
  views,
  author,
  videoUrl,
  description,
  subscriber,
  isLive,
}) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="PlaySingleVideos">
      <SideLinks />
      <div className="VideoPlayCard">
        <video src={videoUrl} controls autoPlay />
        <Box className="Video-Details">
          <Text className="title" fontWeight={"bold"}>
            {title}
          </Text>
          <Box className="logo-name">
            <Box className="icon-subs">
              <Image className="channel-logo" src={thumbnailUrl} alt={title} />
              <Box className="subcount">
                <Text className="author">{author}</Text>
                <Text className="subscriber">
                  {subscriber >= 1000 && subscriber < 1000000
                    ? `${(subscriber / 1000).toFixed(2)}K`
                    : subscriber >= 1000000 && subscriber < 1000000000
                    ? `${(subscriber / 1000000).toFixed(2)}M`
                    : subscriber}
                </Text>
              </Box>
            </Box>
            <Button
              onClick={() => setSubscribed((previousValue) => !previousValue)}
              id="subscribe-btn"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
            <Box className="likes-dislikes">
              <i className="bi bi-hand-thumbs-up">
                {" " + (Math.random() * 10).toFixed(1)} K
              </i>
              <i className="bi bi-hand-thumbs-down"></i>
            </Box>
            <Button colorScheme="green" className="share">
              <i className="bi bi-share"> Share</i>
            </Button>

            <Button colorScheme="blue">
              <i className="bi bi-three-dots"></i>
            </Button>
          </Box>
        </Box>
        <Box
          className="desc"
          onClick={(event) => (event.target.style.height = "max-content")}
        >
          <strong>Views: </strong>
          {views} <strong>Uploaded: </strong> {uploadTime} <br />
          {description}
        </Box>
      </div>
      <SideCards />
    </div>
  );
}
