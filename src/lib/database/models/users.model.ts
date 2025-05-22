import { Schema, model, models } from "mongoose";

export const CardSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  desc: { type: String },
  atk: { type: Number },
  def: { type: Number },
  type: { type: String },
  race: { type: String },
  attribute: { type: String },
  price: { type: Number },
  img: { type: String, required: true },
  deckType: { type: String },
});

const DeckSchema = new Schema(
  {
    name: { type: String, required: true, default: "NoName" },
    main: [CardSchema],
    extra: [CardSchema],
    side: [CardSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const UserSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: [true, "Please provide a pseudo"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    decks: [DeckSchema],
    favs: [CardSchema],
  },
  {
    timestamps: true,
  }
);

const Users = models.Users || model("Users", UserSchema);

export default Users;
