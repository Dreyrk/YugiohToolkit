import mongoose from "mongoose";

// Define the Session schema for MongoDB adapter
const SessionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

// Create or reuse the Session model
const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
