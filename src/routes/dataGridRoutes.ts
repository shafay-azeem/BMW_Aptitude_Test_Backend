import express, { Router } from "express";
import {
    getAllData,
    getDataById,
    deleteDataById,
    searchData,
    filterData,
} from "../controllers/dataEntryController"; // Import controller functions

const router: Router = express.Router(); // Initialize the router with type annotation

// Define routes and map them to controller functions using TypeScript
router.route("/getData").get(getAllData); // Fetch all entries
router.route("/getData/:id").get(getDataById).delete(deleteDataById); // Fetch a single entry by ID and delete it
router.route("/search").get(searchData); // Search dynamically across all fields
router.route("/filter").get(filterData); // Filter data by column and criteria

export default router; // Export the router as the default export
