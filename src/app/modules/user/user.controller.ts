import { Request, Response } from 'express';
import { UserService } from './user.service';
import responseSender from '../../utils/sendResponse';

const createStudent = async (req: Request, res: Response) => {
  const { successResponse, errorResponse } = responseSender(res);
  try {
    const { password, student: studentData } = req.body;
    // const zodParsedData = StudentValidation.studentValidationSchema.parse(
    //   req.body,
    // );
    // Extract the student data from the nested structure
    const result = await UserService.createStudentIntoDB(password, studentData);
    //send response
    successResponse('User is created successfully', result);
  } catch (error) {
    errorResponse(error);
  }
};

export const UserControllers = {
  createStudent,
};
