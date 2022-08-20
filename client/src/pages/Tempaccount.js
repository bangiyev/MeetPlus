import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";
import { UserAuth } from "../context/AuthContext";
import "./TempaccountStyles.css";
import pfp from "../images/example-pfp.png";
import bell from "../icons/bell.png";

const Tempaccount = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let fetched = true;
    const getUserNames = async () => {
      const usersFromServer = await fetchUserNames();
      if (fetched) {
        setUsers(usersFromServer);
      }
    };
    getUserNames();
    return () => (fetched = false);
  }, []);

  const fetchUserNames = async () => {
    try {
      const response = await fetch("/api/users");
      const json = await response.json();
      if (response.ok) {
        console.log("ok");
        return json;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu />
      <h2 className="team-members-heading">Team Members</h2>
      <div className="container">
        <div className="frame">
          {users &&
            users.map((user) => (
              <div key={user._id} className="member-card">
                <div className="member-card-info">
                  <img className="pfp" alt="img" src={pfp}></img>
                  <p className="member-name">{user.displayName} </p>
                  <p className="member-email">{user.email}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <img className="bell" alt="bell" src={bell}></img>
    </>
  );
};

export default Tempaccount;
