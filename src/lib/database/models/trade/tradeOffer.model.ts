import { Schema, model, models } from "mongoose";

const TradeOfferSchema = new Schema(
  {
    proposal: {
      type: Schema.Types.ObjectId,
      ref: "TradeProposals",
      required: true,
    },
    offerer: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    masterCard: {
      type: Schema.Types.ObjectId,
      ref: "Cards",
      required: true,
    },
    cardDetails: {
      condition: {
        type: String,
        required: true,
        enum: ["Neuf", "Quasi neuf", "Peu joué", "Joué", "Abîmé"],
      },
      language: {
        type: String,
        required: true,
        enum: ["FR", "EN", "DE", "JP", "IT", "ES"],
      },
      notes: {
        type: String,
        trim: true,
        maxLength: 250,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "declined_by_user", "declined_by_system"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "trade_offers",
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const TradeOffers = models.TradeOffers || model("TradeOffers", TradeOfferSchema);

export default TradeOffers;
