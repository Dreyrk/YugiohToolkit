import { Schema, model, models } from "mongoose";

export const CardSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
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

export const CollectionCardSchema = new Schema({
  id: { type: String },
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
  duplicate: { type: Boolean, default: false },
});

const DeckSchema = new Schema(
  {
    name: { type: String, required: true, default: "Non défini" },
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

const CollectionSchema = new Schema({
  name: { type: String, required: true, default: "Non défini" },
  description: { type: String, required: false },
  cards: [CollectionCardSchema],
  isSharable: { type: Boolean, default: false },
});

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
    collections: [CollectionSchema],
    favs: [CardSchema],
  },
  {
    timestamps: true,
  }
);

const Users = models.Users || model("Users", UserSchema);

export default Users;
