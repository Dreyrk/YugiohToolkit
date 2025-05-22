import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import db from "../database/db";

await db();

export const lucia = new Lucia(
  new MongodbAdapter(mongoose.connection.collection("sessions"), mongoose.connection.collection("users")),
  {
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        pseudo: attributes.pseudo,
        email: attributes.email,
      };
    },
  }
);
