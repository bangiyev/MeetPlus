import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./NavStyles.css";

const NavBar = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="header">
        <button className="home-button" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="account-button" onClick={() => navigate("/account")}>
          Account
        </button>
        <button className="signout-button" onClick={handleSignOut}>
          Log out
        </button>
      </section>
    </>
  );
};

export default NavBar;
