import e, { NextFunction } from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema({

    destination: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },

    },
    {
        timestamps: true
    }
    );

    /*tripSchema.pre("save", function (next: NextFunction) => {

    })
*/
    const Trip = mongoose.model('Trip', schema);

    export default Trip;