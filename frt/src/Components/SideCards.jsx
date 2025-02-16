import React, { useEffect, useReducer } from "react";
import { getHomePageData, homeInitState, homeReducer } from "../API/fetchData";
import '../style/Sidecards.css';
export default function SideCards() {
  const [state, dispatch] = useReducer(homeReducer, homeInitState);

  useEffect(() => {
    getHomePageData(dispatch);
  }, []);

  if (state.loading) {
    return (
      <div className="loading-container">
        <img
          className="loading-spinner"
          src={"/assets/loading.gif"}
          alt="Loading data"
        />
      </div>
    );
  }

  return (
    <div className="SideCards">
      {state.data.map((product) => (
        <div className="card" key={product.id}>
          <div className="card-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="card-content">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 
