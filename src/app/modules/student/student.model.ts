import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import config from '../../config';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    validate: function (value: string) {
      const firstName = value.charAt(0).toUpperCase() + value.slice(1);
      return firstName === value;
    },
    message: 'First name must start with a capital letter',
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, 'Last name cannot be more than 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: 'Last name must be alphanumeric',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, unique: true, required: true },
  password: {
    type: String,
    unique: true,
    required: [true, 'Password is required'],
  },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status',
    },
    default: 'active',
  },
});
// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Move middleware before model creation
studentSchema.pre('save', async function (next) {
  // console.log(this, "pre hook : we will save the data");
  //  hash the password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = bcrypt.hashSync(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

studentSchema.post('save', function () {
  console.log(this, 'post hook : we saved the data');
});

// Create and export model after middleware is defined
const Student = model<TStudent, StudentModel>('Student', studentSchema);
export default Student;
