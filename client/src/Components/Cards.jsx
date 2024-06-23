// Packages
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Cards({
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
  target,
}) {
  return (
    <Link to={`/${target}/${id}`} className="Cards">
      <Box>
        <Box>
          <Image src={thumbnailUrl} alt={title} />
        </Box>
        <Box>
          <Text className="title">{title}</Text>
          <Box className="details">
            <Image className="channel-logo" src={thumbnailUrl} alt={author} />
            <Box>
              <Text className="author">{author}</Text>
              <Box className="views">
                <Text>{views} views</Text>
                <i className="bi bi-dot"></i>
                <Text>{uploadTime}</Text>
              </Box>
            </Box>
          </Box>

          {/* This block will be executed once the user searches for any video */}
          {location.href.includes(`http://localhost:5173/search`) ||
          location.href.includes(`http://localhost:5173/your-videos`) ? (
            <Box className="SearchDesc">{description}</Box>
          ) : null}
        </Box>
      </Box>
    </Link>
  );
}
