import 'dotenv/config';
import mongoose from "mongoose";
console.log('TEST123');

if(process.env.MONGO_CONNECTION) {
mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error(error));
}
else {
    throw new Error('No MongoDB connection string!');
} 