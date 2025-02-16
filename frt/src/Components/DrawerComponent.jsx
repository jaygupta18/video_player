import React from "react";
import { Link } from "react-router-dom";
import "../style/Drawer.css";
import { IoMdMenu } from "react-icons/io";
export default function DrawerComponent() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleDrawer}>
        <IoMdMenu id="drawer-button"  style={{ fontSize: "25px", }}/>
      </div>

      {isOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={toggleDrawer}>x</button>
            <div className="drawer-header">
              <div className="title">
                <i className="bi bi-list hamburger-icon"></i>
                <img
                  src="../assets/logo.png"
                  alt="Logo"
                  className="logo"
                />
              </div>
            </div>

            <div className="drawer-body">
              <div className="links">
                <Link className="link">
                  <i className="icon home-icon"></i>
                  <span>Home</span>
                </Link>

                <Link className="link">
                  <i className="icon trending-icon"></i>
                  <span>Trending</span>
                </Link>

                <Link className="link">
                  <i className="icon subscription-icon"></i>
                  <span>Subscription</span>
                </Link>

                <span className="section-title">Library</span>

                <Link className="link">
                  <i className="icon history-icon"></i>
                  <span>History</span>
                </Link>

                <Link className="link">
                  <i className="icon watchlater-icon"></i>
                  <span>Watch Later</span>
                </Link>

                <Link className="link">
                  <i className="icon likedvideos-icon"></i>
                  <span>Liked Videos</span>
                </Link>

                <Link className="link">
                  <i className="icon purchase-icon"></i>
                  <span>Purchase</span>
                </Link>

                <span className="section-title">You</span>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>Your Channel</span>
                </Link>

                <span className="section-title">Subscriptions</span>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>Unacademy</span>
                </Link>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>Physics-wallah</span>
                </Link>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>Love-babbar</span>
                </Link>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>Striever</span>
                </Link>

                <Link className="link">
                  <i className="icon channel-icon"></i>
                  <span>CodeWithHarry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
