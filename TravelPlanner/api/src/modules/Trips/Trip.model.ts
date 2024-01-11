import e, { NextFunction } from "express";
import mongoose from "mongoose";


const tripSchema = new mongoose.Schema({

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
    }

},
{
    timestamps: true
});

tripSchema.pre('save', function (next: NextFunction)  {
    const validationError = this.validateSync();
    if (validationError){
        throw validationError;
    };
    next();
});

    const Trip = mongoose.model('Trip', tripSchema);

    export default Trip;