import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import isValidEmail from "../../validation/isValidEmail";
import { Trip } from "./Trip.types";
import ProjectModel from "../Project/Project.model";

const tripSchema = new mongoose.Schema<Trip>(
  {
    destination: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

tripSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  // delete all projects that belong to this trip
  ProjectModel.deleteMany({ tripId: this._id }).exec();
  next();
});

tripSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  // delete all projects that belong to this trip
  const id = this.getFilter()["_id"];
  ProjectModel.deleteMany({ tripId: id }).exec();
  next();
});

const TripModel = mongoose.model<Trip>("Trip", tripSchema);

export default TripModel;