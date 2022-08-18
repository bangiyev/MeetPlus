import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <h1>Welcome</h1>
      <button onClick={() => navigate("/schedule")}>Schedule</button>
      <button onClick={() => navigate("/account")}>Account</button>
    </div>
  );
};

export default Home;
