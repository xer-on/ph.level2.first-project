import { TStudent } from './student.interface';
import Student from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);
  // built in static method
  const student = new Student(studentData);

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await student.save();
  // built in instance method
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
