import mongoose from "mongoose";
import { Project } from "./Project.types";
import validateModel from "../../validation/validateModel";
import LogModel from "../Log/Log.model";

const projectSchema = new mongoose.Schema<Project>(
  {
    name: {
      type: String,
      required: true,
    },
    tripId: {
      // don't import ObjectId -> TS problems
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
});

projectSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

projectSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  // delete all logs that belong to this trip
  LogModel.deleteMany({ tripId: this._id }).exec();
  next();
});

projectSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  // delete all logs that belong to this trip
  const id = this.getFilter()["_id"];
  LogModel.deleteMany({ tripId: id }).exec();
  next();
});

const ProjectModel = mongoose.model<Project>("Project", projectSchema);

export default ProjectModel;