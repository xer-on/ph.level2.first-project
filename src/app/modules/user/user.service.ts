import { TUser } from './user.interface';
import { config } from '../../config';
import { TStudent } from '../student/student.interface';
import User from './user.model';
import Student from '../student/student.model';
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // set Student Role
  const userData: Partial<TUser> = {};

  // check if password is not provided then use default password
  userData.password = password || (config.default_password as string);

  // set role
  userData.role = 'student';

  // mannualy generated id
  userData.id = '1234567890';

  //create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length > 0) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);

    return newStudent;
  }

  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
