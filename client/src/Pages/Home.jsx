// Packages
import  { useContext, useEffect, useReducer } from "react";
import { homeReducer, homeInitState, getHomePageData } from "../API/fetchData";
import Cards from "../Components/Cards";
import { Box, Image } from "@chakra-ui/react";

import SideLinks from "../Components/SideLinks";

import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

export default function Home() {
  const { setQuery } = useContext(AuthenticationContext);
  const [state, dispatch] = useReducer(homeReducer, homeInitState);

  useEffect(() => {
    getHomePageData(dispatch);
    setQuery("");
  }, []);

  if (state.loading) {
    return (
      <div className="loading-data">
        <Image
          src={`https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif`}
          alt={"loading-data"}
        />
      </div>
    );
  }

  return (
    <div className="Home">
      <SideLinks />
      <Box className="Videos">
        {state.data.map((video) => (
          <Cards {...video} key={video.id} target={"videos"} />
        ))}
      </Box>
    </div>
  );
}
