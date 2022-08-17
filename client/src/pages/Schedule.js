import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
const events = [
  {
    title: "Solomon Unavailable",
    allDay: true,
    start: new Date(2022, 8, 0),
    end: new Date(2022, 8, 0),
  },
  {
    title: "Joey Unavailable",
    allDay: true,
    start: new Date(2022, 8, 0),
    end: new Date(2022, 8, 0),
  },
  {
    title: "Alma Unavailable",
    allDay: true,
    start: new Date(2022, 8, 0),
    end: new Date(2022, 8, 0),
  },
];

export default function Schedule() {
  const [myEvents, setEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const json = await response.json();
        if (response.ok) {
          console.log("ok");
          console.log(json);
          json.forEach((eventObject) => {
            eventObject.start = new Date(eventObject.start);
            eventObject.end = new Date(eventObject.end);
          });
          console.log(json);
          setEvents(json);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectSlot = useCallback(
    async ({ start, end }) => {
      const title = window.prompt("New Event name");
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

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <Fragment>
      <strong>
        Click an event to see more info, or drag the mouse over the calendar to
        select a date/time range.
      </strong>

      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </Fragment>
  );
}
