import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  timeIn: String,
  timeOut: String,
  description: String,
});
