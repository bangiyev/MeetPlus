import {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import NavBar from "../components/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import emailjs from "@emailjs/browser";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const templateParams = {
  subject: "REMINDER- Calendar Event",
  to_email: "",
  message: "New meeting has been scheduled. Check your calendar",
};
const publicKey = "mW6oS7yH46JF5vmch";
const serviceID = "service_bj1j7ol";
const templateID = "template_jkrmcxn";

export default function Schedule() {
  const [myEvents, setEvents] = useState();
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  // Populate calendar with events from server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const json = await response.json();
        if (response.ok) {
          console.log("ok");
          json.forEach((eventObject) => {
            eventObject.start = new Date(eventObject.start);
            eventObject.end = new Date(eventObject.end);
          });
          setEvents(json);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // add new event to server
  const handleSelectSlot = useCallback(
    async ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        const event = { title, start, end };
        console.log(event);
        const response = await fetch("/api/events", {
          method: "POST",
          body: JSON.stringify(event),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (!response.ok) {
          console.log(json.error);
        }
        if (response.ok) {
          console.log("new event added");
        }

        setNewEvent(() => ({ title: title, start: start, end: end }));
        setEvents(() => [...myEvents, { start, end, title }]);
      }
    },
    [setEvents, setNewEvent, myEvents]
  );

  // const sendEmail = () => {
  //   console.log("send email");
  //   try {
  //     emailjs.send(serviceID, templateID, templateParams, publicKey);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const sendEmail = async (event) => {
    console.log("send email");
    const response = await fetch("/api/users");
    const json = await response.json();
    console.log(json);
    const emails = [];
    json.forEach((userObject) => {
      emails.push(userObject.email);
    });
    templateParams.to_email = emails.join(", ");
    templateParams.message = `Your group sent you a new reminder:\n\nEVENT NAME: ${
      event.title
    } \nSTART TIME: ${event.start.toString()} \nEND TIME: ${event.end.toString()} `;
    console.log(templateParams.message);
    try {
      emailjs.send(serviceID, templateID, templateParams, publicKey);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectEvent = useCallback((event) => {
    if (window.confirm("Send reminder email?")) {
      sendEmail(event);
      console.log("EVENT: ", event);
    }
  });

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <Fragment>
      <NavBar />
      <strong>
        Click an event to see more info, or drag the mouse over the calendar to
        select a date/time range.
      </strong>

      <div className="blank">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: 1000, margin: "50px" }}
        />
      </div>
    </Fragment>
  );
}
