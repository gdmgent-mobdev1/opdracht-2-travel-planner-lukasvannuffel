import { Trip } from "../trips/Trip.types";

export type Project = {
  _id: string;
  destination: string;
  tripId: string;
  trip?: Trip;
};

export type ProjectBody = Omit<Project, "_id">;