import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { config } from '../../config';
const userschema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: [true, 'User ID must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
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
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userschema.pre('save', async function (next) {
  // console.log(this, "pre hook : we will save the data");
  //  hash the password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = bcrypt.hashSync(
    user.password,
    Number(config.bcrypt_salt_rounds as string),
  );
  next();
});

userschema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const User = model<TUser>('User', userschema);

export default User;
