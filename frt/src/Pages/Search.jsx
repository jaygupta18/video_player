// Packages
import React, { useContext, useEffect, useState } from "react";
import "../style/Search.css"
import SideLinks from "../Components/SideLinks";
import "../style/Home.css";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { searchVideos } from "../API/fetchData";
import Cards from "../Components/Cards";

export default function Search() {
  const { query } = useContext(AuthenticationContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log(query)
    const response = await searchVideos(query);
    setData([...response]);
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="home">
      <div className="side">
      <SideLinks />
     </div>
      <div className="videos">
        {data.map((video) => (
          <Cards {...video} key={video._id} pageName={"search"} target={"videos"} />
        ))}
      </div>
    </div>
    
  );
}
