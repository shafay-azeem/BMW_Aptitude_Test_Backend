import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the schema
export interface IDataEntry extends Document {
    data: Map<string, unknown>; // Dynamic structure for handling key-value pairs
    createdAt: Date; // Timestamp for when the entry was created
}

// Define the schema
const GenericSchema: Schema<IDataEntry> = new mongoose.Schema<IDataEntry>({
    data: { type: Map, of: mongoose.Schema.Types.Mixed, required: true }, // Map with dynamic key-value pairs
    createdAt: { type: Date, default: Date.now }, // Default to current timestamp
});

// Export the model
const DataEntry: Model<IDataEntry> = mongoose.model<IDataEntry>("DataEntry", GenericSchema);

export default DataEntry;
