import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userschema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      required: true,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model<TUser>('User', userschema);

export default User;
