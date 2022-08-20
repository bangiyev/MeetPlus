import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import "./SignInStyles.css";
import image from "../images/login-image.png";

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
      <img className="login-image" src={image}></img>
      <h1 className="welcome-text">Welcome to Headstarter!</h1>
      <GoogleButton
        className="google-button"
        type="light"
        onClick={handleGoogleSignIn}
        style={{ width: "300px", "margin-left": "42%" }}
      />
    </div>
  );
};

export default Home;
