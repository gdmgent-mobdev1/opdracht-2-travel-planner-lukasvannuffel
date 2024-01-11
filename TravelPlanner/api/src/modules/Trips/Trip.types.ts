import { Document} from "mongoose";

export type Trip = Document & {
  _id?: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
};