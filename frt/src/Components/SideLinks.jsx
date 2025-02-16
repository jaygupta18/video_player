import React from 'react';
import { Link } from 'react-router-dom';
import "../style/SideLinks.css";
import { 
  FaHome, 
  FaUserFriends, 
  FaVideo, 
  FaUser, 
  FaHistory, 
  FaPlayCircle, 
  FaClock, 
  FaTv,
  FaBroadcastTower // Add this icon for live broadcasts
} from 'react-icons/fa'; 
import { IoMdTrendingUp } from "react-icons/io";  

export default function NavigationMenu() {
  return (
    <div className="navigation-menu">
      <div className="menu-section-title">Latest</div>
      <Link to="/">
        <div className="menu-link">
          <FaHome />
          <span>Home</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
           <IoMdTrendingUp/>
          <span>Trending</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaUserFriends />
          <span>Subscription</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaVideo />
          <span>Videos</span>
        </div>
      </Link>

      <Link to="/live-broadcasts">
        <div className="menu-link">
          <FaBroadcastTower />
          <span>Live Broadcasts</span>
        </div>
      </Link>

      <div className="menu-section-title">You</div>

      <Link>
        <div className="menu-link">
          <FaUser />
          <span>Your Channel</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaHistory />
          <span>History</span>
        </div>
      </Link>

      <Link to={"/your-videos"}>
        <div className="menu-link">
          <FaPlayCircle />
          <span>Your Videos</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaClock />
          <span>Watch Later</span>
        </div>
      </Link>

      <div className="menu-section-title">Subscriptions</div>

      <Link>
        <div className="menu-link">
          <FaTv />
          <span>Unacademy</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaTv />
          <span>Physics-wallah</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaTv />
          <span>Love-babbar</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaTv />
          <span>Striever</span>
        </div>
      </Link>

      <Link>
        <div className="menu-link">
          <FaTv />
          <span>CodeWithHarry</span>
        </div>
      </Link>
    </div>
  );
}