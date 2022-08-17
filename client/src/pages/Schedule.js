import React, { Fragment, useState, useCallback, useMemo } from "react";
//import PropTypes from "prop-types";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
//import DemoLink from '../../DemoLink.component'
//import events from '../../resources/events'
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

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      if (title) {
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
      defaultDate: new Date(2022, 3, 12),
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
