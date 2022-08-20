import React from "react";
import { Link } from "react-router-dom";
import "./MenuStyles.css";
import Logo from "../icons/Logo.png";
import account from "../icons/Icon-8.png";
import line from "../icons/Line.png";
import home from "../icons/Icon-1.png";
import schedule from "../icons/Icon-2-bold.png";

const Menu = () => {
  return (
    <div className="menu">
      <div className="bg">
        <Link to="/home">
          <img className="logo" alt="Home" src={Logo}></img>
        </Link>

        <img className="line" src={line}></img>

        {window.location.href.includes("home") && (
          <>
            <Link to="/home">
              <img className="icon-1" alt="Home" src={home}></img>
            </Link>

            <Link to="/schedule">
              <img
                className="icon-2"
                alt="Schedule"
                src={schedule}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>

            <Link to="/account">
              <img
                className="icon-8"
                alt="account"
                src={account}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>
          </>
        )}

        {window.location.href.includes("schedule") && (
          <>
            <Link to="/home">
              <img
                className="icon-1"
                alt="Home"
                src={home}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>

            <Link to="/schedule">
              <img className="icon-2" alt="Schedule" src={schedule}></img>
            </Link>

            <Link to="/account">
              <img
                className="icon-8"
                alt="account"
                src={account}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>
          </>
        )}

        {window.location.href.includes("account") && (
          <>
            <Link to="/home">
              <img
                className="icon-1"
                alt="Home"
                src={home}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>

            <Link to="/schedule">
              <img
                className="icon-2"
                alt="Schedule"
                src={schedule}
                style={{ opacity: "0.3" }}
              ></img>
            </Link>

            <Link to="/account">
              <img className="icon-8" alt="account" src={account}></img>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
