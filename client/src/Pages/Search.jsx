// Packages
import React, { useContext, useEffect, useState } from "react";

import SideLinks from "../Components/SideLinks";

import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { searchVideos } from "../API/fetchData";
import Cards from "../Components/Cards";

export default function Search() {
  const { query } = useContext(AuthenticationContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await searchVideos(query);
    setData([...response]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Search">
      <SideLinks />
      <div className="SearchResult">
        {data.map((video) => (
          <Cards {...video} key={video.id} pageName={"search"} target={"videos"} />
        ))}
      </div>
    </div>
  );
}
