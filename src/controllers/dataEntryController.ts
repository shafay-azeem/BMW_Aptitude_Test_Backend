import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import DataEntry from "../models/dataEntryModel"; // Import the model

// Fetch all data
const getAllData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const entries = await DataEntry.find();

        if (entries.length === 0) {
            const error = new Error("No data found");
            (error as any).statusCode = 404;
            throw error;
        }

        const headers = Array.from(entries[0].data.keys());

        const rows = entries.map((entry: any) => ({
            _id: entry._id,
            ...Object.fromEntries(entry.data),
        }));

        res.status(200).json({
            message: "Row fetched successfully",
            headers,
            data: rows,
            length: rows.length
        });
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
});

// Fetch data by ID
const getDataById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const entry = await DataEntry.findById(req.params.id);

        if (!entry) {
            const error = new Error("Row not found");
            (error as any).statusCode = 404;
            throw error;
            
        }

        const row = {
            _id: entry._id,
            ...Object.fromEntries(entry.data),
        };

        res.status(200).json({ message: "Row fetched successfully", data: row });
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
});

// Delete data by ID
const deleteDataById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const entry = await DataEntry.findByIdAndDelete(req.params.id);

        if (!entry) {
            const error = new Error("Row not found");
            (error as any).statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: "Row deleted successfully", id: entry._id });
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
});

// Search data dynamically across all fields
const searchData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value } = req.query;

        if (!value || typeof value !== "string") {
            const error = new Error('Please provide a "value" for search');
            (error as any).statusCode = 400;
            throw error;
        }

        const entries = await DataEntry.find();

        if (entries.length === 0) {
            const error = new Error("No data found");
            (error as any).statusCode = 404;
            throw error;
        }

        const results = entries.filter((entry: any) => {
            const dataObject = Object.fromEntries(entry.data);
            return Object.values(dataObject).some((fieldValue) =>
                String(fieldValue).toLowerCase().includes(value.toLowerCase())
            );
        });

        if (results.length === 0) {
            const error = new Error("No matching entries found");
            (error as any).statusCode = 404;
            throw error;
        }

        const formattedResults = results.map((entry: any) => ({
            _id: entry._id,
            ...Object.fromEntries(entry.data),
        }));

        res.status(200).json({
            message: "Rows fetched Successfully",
            data: formattedResults,
            count: formattedResults.length,
        });
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
});

// Filter data by column and criteria
const filterData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { column, criteria, value } = req.query;

        if (!column || !criteria || typeof column !== "string" || typeof criteria !== "string") {
            const error = new Error('Please provide "column" and "criteria" for filtering');
            (error as any).statusCode = 400;
            throw error;
        }

        const entries = await DataEntry.find();

        if (entries.length === 0) {
            const error = new Error("No data found");
            (error as any).statusCode = 404;
            throw error;
        }

        const results = entries.filter((entry: any) => {
            const dataObject = Object.fromEntries(entry.data);
            const columnValue = dataObject[column] ? String(dataObject[column]) : "";

            switch (criteria) {
                case "contains":
                    return columnValue.toLowerCase().includes(value?.toString().toLowerCase() || "");
                case "equals":
                    return columnValue.toLowerCase()?.trim() === value?.toString().toLowerCase()?.trim() ;
                case "starts with":
                    return columnValue.toLowerCase().startsWith(value?.toString().toLowerCase() || "");
                case "ends with":
                    return columnValue.toLowerCase().endsWith(value?.toString().toLowerCase() || "");
                case "is empty":
                    return columnValue === "";
                default:
                    return false;
            }
        });

        if (results.length === 0) {
            const error = new Error("No matching entries found");
            (error as any).statusCode = 404;
            throw error;
        }

        const formattedResults = results.map((entry: any) => ({
            _id: entry._id,
            ...Object.fromEntries(entry.data),
        }));

        res.status(200).json({
            message: "Rows Fetched Successfully",
            data: formattedResults,
            count: formattedResults.length,
        });
    } catch (error: any) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
});

export { getAllData, getDataById, deleteDataById, searchData, filterData };
