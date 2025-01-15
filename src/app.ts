import express, { Application } from "express";
import cors from "cors";
import dataGrid from "./routes/dataGridRoutes"; // Import your routes

const app: Application = express(); // Initialize the Express application

// Middleware to parse JSON
app.use(express.json());

// CORS (Cross-Origin Resource Sharing)
// Allows requests from other domains
app.use(cors());

// Define routes
app.use("/api/dataGrid/V1", dataGrid);

// Export the application instance
export default app;
