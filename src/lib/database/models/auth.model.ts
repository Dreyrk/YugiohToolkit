import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
