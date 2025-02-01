import { TStudent } from './student.interface';
import Student from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const createStudentIntoDB = async (studentData: TStudent) => {
  // custom static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData);
  // built in static method
  // const student = new Student(studentData);

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save();
  // built in instance method

  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentsFromDB,
};
