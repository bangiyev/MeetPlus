import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./HomeStyles.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <h1 className="home-heading">MeetPlus</h1>
      <div className="home-buttons-container">
        <button
          className="home-screen-buttons"
          onClick={() => navigate("/schedule")}
        >
          Schedule
        </button>
        <button
          className="home-screen-buttons"
          onClick={() => navigate("/account")}
        >
          Group Chat
        </button>
      </div>
    </div>
  );
};

export default Home;
