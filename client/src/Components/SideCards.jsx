// Packages
import React, { useEffect, useReducer } from "react";
import { getHomePageData, homeInitState, homeReducer } from "../API/fetchData";
import { Image } from "@chakra-ui/react";
import Cards from "./Cards";

export default function SideCards() {
  const [state, dispatch] = useReducer(homeReducer, homeInitState);

  useEffect(() => {
    getHomePageData(dispatch);
  }, []);

  if (state.loading) {
    return (
      <Image
        className="loading-single-page-data"
        src={`https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif`}
        alt={"loading-data"}
      />  
    );
  }

  return (
    <div className="SideCards">
      {state.data.map((product) => (
        <Cards {...product} key={product.id} target={"videos"} />
      ))}
    </div>
  );
}
