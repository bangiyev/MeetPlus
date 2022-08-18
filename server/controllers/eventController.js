const Event = require("../models/eventModel");
const mongoose = require("mongoose");

// get all events
const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 }); // sort so newest are first
  res.status(200).json(events);
};

// create event
const createEvent = async (req, res) => {
  const { title, start, end } = req.body;
  try {
    const event = await Event.create({ title, start, end });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// const addUserEmail = async (req, res) => {
//   const {displayName, email} = req.body;
//   try {

//   }
// }

module.exports = { getEvents, createEvent };
