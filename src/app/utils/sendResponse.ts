import { Response } from 'express';
import status from 'http-status';

// Main response sender function that returns all response utilities
const responseSender = (res: Response) => {
  // Success response utility
  const successResponse = <T>(message: string, data: T) => {
    res.status(status.OK).json({
      success: true,
      message: message,
      data: data,
    });
  };

  // Error response utility
  const errorResponse = (error: unknown) => {
    // Default error message
    let message = 'Something went wrong';

    // Extract error message based on error type
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: message,
    });
  };

  // Return all utilities as an object
  return {
    successResponse,
    errorResponse,
  };
};

export default responseSender;
