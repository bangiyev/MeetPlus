import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";
import { UserAuth } from "../context/AuthContext";
import "./TempaccountStyles.css";

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
    <div>
      <Menu />
      <h2 className="group-members-heading">Your group members</h2>
      <div className="group-members-container">
        {users &&
          users.map((user) => (
            <div key={user._id} className="group-member">
              <>
                <h4 className="group-member-name">{user.displayName} </h4>
                <>{user.email}</>
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tempaccount;
