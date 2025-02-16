// Packages
import { useContext, useEffect, useState } from "react";
import { getYourVideos } from "../API/fetchData";
import SideLinks from "../Components/SideLinks";
import Cards from "../Components/Cards";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

export default function YourVideos() {
  const [data, setData] = useState([]);
  const { email } = useContext(AuthenticationContext);

  const getData = async () => {
    const response = await getYourVideos(email);
    setData([...response.videos]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="YourVideos">
      <SideLinks />
      <div className="SearchResult">
        {data.map((video) => (
          <Cards {...video} key={video._id} target={"uploads"} />
        ))}
      </div>
    </div>
  );
}
