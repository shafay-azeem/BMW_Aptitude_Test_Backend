import mongoose from "mongoose";

const connectDataBase = async (): Promise<void> => {
    try {
        // Using the connect method of the mongoose library to connect to the database
        const connection = await mongoose.connect(process.env.DB_URL as string);
        console.log(`MongoDB connected with server: ${connection.connection.host}`);
    } catch (err) {
        // Log the error if the connection fails
        console.error("Error connecting to MongoDB:", err);
    }
};

export default connectDataBase;
