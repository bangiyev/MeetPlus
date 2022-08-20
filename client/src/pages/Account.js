import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Menu from "../components/Menu";
import pfp from "../images/example-pfp.png";
import bell from "../icons/bell.png";
import "./AccountStyles.css";

const Account = () => {
  const [users, setUsers] = useState([]);
  const { logOut } = UserAuth();

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

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Menu />
      <h2 className="team-members-heading">Team Members</h2>
      <div class="container">
        {users &&
          users.map((user) => (
            <div key={user._id} className="member-card">
              <img className="pfp" alt="img" src={pfp}></img>
              <p className="member-name">{user.displayName} </p>
              <p className="member-email">{user.email}</p>
            </div>
          ))}
      </div>

      <img className="bell" alt="bell" src={bell} onClick={handleSignOut}></img>
    </>
  );
};

// export default Account;
//   return (
//     <>
//       <Menu />
//       <h2 className="team-members-heading">Team Members</h2>
//       {/* <div className="container"> */}
//       {/* <div className="frame">
// {users &&
//   users.map((user) => (
//     <div key={user._id} className="member-card">
//       <img className="pfp" alt="img" src={pfp}></img>
//       <p className="member-name">{user.displayName} </p>
//       <p className="member-email">{user.email}</p>
//     </div>
//   ))}
//       </div> */}
//       {/* </div> */}
//       <img className="bell" alt="bell" src={bell} onClick={handleSignOut}></img>
//     </>
//   );
// };

export default Account;
//
