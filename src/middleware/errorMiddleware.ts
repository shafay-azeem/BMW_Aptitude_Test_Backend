import { Request, Response, NextFunction } from "express";

// Middleware for handling 404 (Not Found) errors
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    (error as any).statusCode = 404; // Assign statusCode dynamically
    next(error);
};

// Middleware for handling general errors
export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(error); // Log the error
    if(error.statusCode==500){
      res.status(500).json({ message: "An error occured" , error: error.message });
    }else{
      res.status(error.statusCode).json({ message: error.message , data: [] });
    }
 
  };
