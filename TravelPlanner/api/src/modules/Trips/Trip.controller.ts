import { NextFunction, Request, Response } from "express";
import Trip from "./Trip.model";
import NotFoundError from "../../middleware/error/notFoundError";

const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
    if (!trips) {
      throw new NotFoundError("Trip not found");
    }
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

const getTripDetail = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return;
    }else{
      res.json(trip);
    }

  } catch (err){
    next(err);

  }
};

const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const trip = new Trip(req.body);
  const validationError = trip.validateSync();
  if (validationError) {
    res.status(401).json({ error: validationError });
    return;
  }
  const result = await trip.save();
  res.status(200).json(result);
} catch (e) {
  res.status(500).json({ error: "Internal Server Error" });
}
};

const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const trip = await Trip.findByIdAndUpdate(id, req.body, { new: true, runValidators: true});
    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return;
  }
  res.json(trip);
} catch (e){
  res.status(500).json({ error: "Internal Server Error" });
};
};

const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const trip = await Trip.findByIdAndDelete(id, req.body, );
    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return;
  }
  res.json(trip);
} catch (e){
  res.status(500).json({ error: "Internal Server Error" });
}
};
export { getTrips, getTripById, createTrip, getTripDetail, updateTrip, deleteTrip };