import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import "./HomeStyles.css";
import calendar from "../images/calendar-home.png";
import homepic from "../images/home-image.png";
import calendarbutton from "../images/home-calendar-button.png";
import chatbutton from "../images/home-chat-button.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Menu />
      <div className="left-side">
        <img className="home-img" src={homepic}></img>
        <h1>Your all-in-one platform to build out projects as a team!</h1>
        <h4>
          Schedule your meetings and join the voice chat all on this platform to
          get work done quicker and in a more collaborative way!
        </h4>
        <img className="chat-button" src={chatbutton}></img>
        <button className="join-call-button">Join the Call</button>
        <img className="calendar-button" src={calendarbutton}></img>
      </div>
      <img className="calendar-img" alt="calendar image" src={calendar}></img>
    </div>
  );
};

export default Home;

{
  /* <div>
<Menu />
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
</div> */
}
