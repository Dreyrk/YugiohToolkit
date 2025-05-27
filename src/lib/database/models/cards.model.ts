import { Schema, model, models } from "mongoose";

const SessionUserSchema = new Schema({
  id: { type: String },
  pseudo: { type: String },
  email: { type: String },
});

const CardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    atk: {
      type: Number,
      required: false,
    },
    def: {
      type: Number,
      required: false,
    },
    level: {
      type: Number,
      required: false,
    },
    race: {
      type: String,
      required: false,
      trim: true,
    },
    attribute: {
      type: String,
      required: false,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: false,
    },
    deckType: {
      type: String,
      required: false,
      trim: true,
      enum: ["main", "extra", "side", null],
    },
    createdBy: {
      type: SessionUserSchema,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "cards",
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id; // Crée un champ `id` à partir de `_id`
        delete ret._id; // Supprime `_id` pour éviter la redondance
        delete ret.__v; // Supprime le champ de version de Mongoose
      },
    },
  }
);

const Cards = models.Cards || model("Cards", CardSchema);

export default Cards;
