import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./NavStyles.css";

const NavBar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="heading">Heading </h1>
      {user?.displayName ? (
        <button className="logout" onClick={handleSignOut}>
          Logout
        </button>
      ) : (
        <Link className="logout" to="/signin">
          Sign in
        </Link>
      )}
    </div>
  );
};

export default NavBar;
