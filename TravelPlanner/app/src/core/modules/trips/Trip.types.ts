export type Trip = {
    _id: string;
    destination: string;
    country: string;
    startDate: string;
    endDate: string;
  };

  export type TripBody = Omit<Trip, "_id">;