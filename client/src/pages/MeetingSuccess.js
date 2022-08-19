import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import "./MeetingSuccessStyles.css";
import image from "../images/Group-87.png";

const MeetingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Menu />
      <div className="frame">
        <img className="image" src={image}></img>
        <h1 className="top-text">
          Congrats! You successfully scheduled your team meeting
        </h1>
        <h4 className="bottom-text">
          An email has been sent to each team member
        </h4>
        <button className="button" onClick={() => navigate("/schedule")}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default MeetingSuccess;
