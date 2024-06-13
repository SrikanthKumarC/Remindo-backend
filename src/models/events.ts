import mongoose from "mongoose";
import { recurringPattern } from "../utils/globals";

export interface IEvent extends mongoose.Document {
  title: string;
  date: Date;
  recurring: boolean;
  recurringType?: string;
}

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
  channels: {
    type: [String],
    required: true,
  },
  webhook: {
    type: String
  },
  createdBy: {
    type: String,
    required: true,
  },
  executed: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
