import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";

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

  useEffect(() => {
    if (user?.displayName) {
      console.log("not null");
      navigate("/home");
    }
  }, [user]);

  return (
    <div>
      <h1> Welcome</h1>
      <div>
        <GoogleButton type="light" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Home;
