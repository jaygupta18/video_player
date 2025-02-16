import React, { useState } from "react";
import "../style/play.css";

export default function VideoPage({
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
}) {
  const [subscribed, setSubscribed] = useState(false);

  const formatSubscriberCount = (count) => {
    if (count >= 1000 && count < 1000000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    return count;
  };

  return (
    <div className="video-page-container">
      <div className="video-card">
        <video className="video-player" src={videoUrl} controls autoPlay />
        <div className="video-details-section">
          <h3 className="video-title">{title}</h3>
          <div className="channel-info">
            <div className="channel-logo-subscribers">
              <img
                className="channel-thumbnail"
                src={thumbnailUrl}
                alt={`${author} logo`}
              />
              <div className="channel-metadata">
                <span className="channel-author">{author}</span>
                <span className="channel-subscribers">
                  {formatSubscriberCount(subscriber)}
                </span>
              </div>
            </div>
            <button
              className="subscribe-button"
              onClick={() => setSubscribed((prev) => !prev)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
         
          <div className="actions-section">
            <button className="share-button">
              <i className="bi bi-share"></i> Share
            </button>
           
          </div>
          <div className="video-description">
            <strong>Views: </strong>
            {views} <strong>Uploaded: </strong> {uploadTime} <br />
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
