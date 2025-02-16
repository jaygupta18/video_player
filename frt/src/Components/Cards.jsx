import React from "react";
import { Link } from "react-router-dom";
import "../style/cards.css"; 

export default function Cards({
  _id,
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
    <Link to={`/${target}/${_id}`} className="cards">
      <div className="card-container">
        <div className="thumbnail-wrapper">
          <img className="thumbnail" src={thumbnailUrl} alt={title} />
        </div>
        <div className="info-wrapper">
          <h3 className="title">{title}</h3>
          <div className="details">
            <img className="channel-logo" src={thumbnailUrl} alt={author} />
            <div className="author-details">
              <p className="author">{author}</p>
              <div className="views-upload">
                <span>{views} views</span>
                <span className="dot">&bull;</span>
                <span>{uploadTime}</span>
                
              </div>
            </div>
          </div>
          {
          location.href.includes(`http://localhost:5173/your-videos`) ? (
            <p className="search-description">{description}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
