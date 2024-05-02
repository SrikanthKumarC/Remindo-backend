import mongoose from "mongoose";
import { recurringPattern } from "../utils/globals";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  recurringType: {
    type: String,
    enum: recurringPattern,
  },
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
