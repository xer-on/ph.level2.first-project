import { Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParsedData = StudentValidation.studentValidationSchema.parse(
    //   req.body,
    // );
    // Extract the student data from the nested structure
    const result = await UserService.createStudentIntoDB(password, studentData);
    //send response
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
