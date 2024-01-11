import { Document, ObjectId } from "mongoose";
import { Trip } from "../Trips/Trip.types";

export type Project = Document & {
  _id?: string;
  name: string;
  ownerId: ObjectId;
  tripId: ObjectId;
  trip?: Trip;
};