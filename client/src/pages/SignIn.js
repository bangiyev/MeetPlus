import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import "./SignInStyles.css";

const Home = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   if (user?.displayName) {
  //     navigate("/home");
  //   }
  // }, [user]);

  useEffect(() => {
    const checkUserDB = async (user) => {
      const displayName = user.displayName;
      const email = user.email;
      const userData = { displayName, email };
      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      console.log(`JSON RESPONSE:`, json);
    };
    if (user?.displayName) {
      checkUserDB(user);
      navigate("/home");
    }
  }, [user]);

  return (
    <div>
      <div className="login-container">
        <label>Email</label>
        <input autoFocus type="text" required placeholder="email@example.com" />
        <label>Password</label>
        <input type="password" required placeholder="Password" />
        <button>Sign In</button>

        <GoogleButton
          className="google-button"
          type="light"
          onClick={handleGoogleSignIn}
          style={{ width: "540px" }}
        />
      </div>
      <div className="second-half-of-login-screen"></div>
    </div>
  );
};

export default Home;
