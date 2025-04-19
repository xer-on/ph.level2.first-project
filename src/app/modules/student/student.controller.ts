import { Request, Response } from 'express';
import { StudentService } from './student.service';
import responseSender from '../../utils/sendResponse';

const getSingleStudent = async (req: Request, res: Response) => {
  const { successResponse, errorResponse } = responseSender(res);
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);
    successResponse('Student is fetched successfully', result);
  } catch (error) {
    errorResponse(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  const { successResponse, errorResponse } = responseSender(res);
  try {
    const result = await StudentService.getAllStudentsFromDB();
    successResponse('Students are fetched successfully', result);
  } catch (error) {
    errorResponse(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const { successResponse, errorResponse } = responseSender(res);
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentsFromDB(studentId);
    successResponse('Student deleted successfully', result);
  } catch (error) {
    errorResponse(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
