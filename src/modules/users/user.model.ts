import mongoose from 'mongoose';
import IUser from './user.interface';

const UserScheme = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    index: true,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser & mongoose.Document>('user', UserScheme);
