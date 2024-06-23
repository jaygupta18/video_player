import React from "react";

import { Link } from "react-router-dom";

import { Text } from "@chakra-ui/react";

import {
  HomeIcon,
  Trending,
  Subscription,
  Channel,
  History,
  WatchLater,
} from "../Components/VariousIcons";

export default function SideLinks() {
  return (
    <div className="SideLinks">
      <Text mb={2}>Latest</Text>
      <Link to={"/"}>
        <HomeIcon />
        <Text>Home</Text>
      </Link>

      <Link>
        <Trending />
        <Text>Trending</Text>
      </Link>

      <Link>
        <Subscription />
        <Text>Subscription</Text>
      </Link>

      <Link>
        <i className="bi bi-play"></i>
        <Text>Videos</Text>
      </Link>

      <Text mb={2}>You</Text>

      <Link>
        <Channel />
        <Text>Your Channel</Text>
      </Link>

      <Link>
        <History />
        <Text>History</Text>
      </Link>

      <Link to={"/your-videos"}>
        <i className="bi bi-play-btn"></i>
        <Text>Your Videos</Text>
      </Link>

      <Link>
        <WatchLater />
        <Text>Watch Later</Text>
      </Link>

      <Text>Subscriptions</Text>

      <Link>
        <i className="bi bi-tv"></i>
        <Text>T-Series</Text>
      </Link>

      <Link>
        <i className="bi bi-tv"></i>
        <Text>Zee Music</Text>
      </Link>

      <Link>
        <i className="bi bi-tv"></i>
        <Text>Geet MP3</Text>
      </Link>

      <Link>
        <i className="bi bi-tv"></i>
        <Text>Apna Sangeet</Text>
      </Link>

      <Link>
        <i className="bi bi-tv"></i>
        <Text>CodeWithHarry</Text>
      </Link>
    </div>
  );
}
