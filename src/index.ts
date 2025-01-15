import express from "express";
import dotenv from "dotenv";
import path from "path";
import xlsx from "xlsx";

import connectDataBase from "./db/Database";
import app from "./app";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import DataEntry from "./models/dataEntryModel";

// Load environment variables
dotenv.config({ path: "src/.env" });

// Initialize the application
connectDataBase(); // Connect to the database

// Middleware for handling errors
app.use(notFound); // Handle wrong endpoint errors
app.use(errorHandler); // Handle other errors

// Start the server
const PORT = process.env.PORT || 5000; // Default to 5000 if no PORT is specified
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import data from the Excel file into MongoDB
const importData = async (): Promise<void> => {
    try {
        // Resolve the path to the CSV file
        const filePath = path.resolve(__dirname, "BMW_Aptitude_Test_Test_Data_ElectricCarData.csv");

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: Record<string, unknown>[] = xlsx.utils.sheet_to_json(sheet);

        // Transform data for the generic schema
        const transformedData = jsonData.map((item) => ({
            data: item, // Store the entire row as key-value pairs
        }));

        // Insert data into MongoDB
        await DataEntry.insertMany(transformedData);
        console.log("Data Imported Successfully");

        process.exit();
    } catch (error) {
        console.error("Error Importing Data:", error);
        process.exit(1);
    }
};

// Uncomment the below line to run data import
// importData();
