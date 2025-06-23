import { Schema, model, models } from "mongoose";

const TradeProposalSchema = new Schema(
  {
    proposer: {
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
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    acceptedOffer: {
      type: Schema.Types.ObjectId,
      ref: "TradeOffer",
    },
  },
  {
    timestamps: true,
    collection: "trade_proposals",
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

const TradeProposals = models.TradeProposals || model("TradeProposals", TradeProposalSchema);

export default TradeProposals;
