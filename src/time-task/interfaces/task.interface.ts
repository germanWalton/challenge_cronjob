import { Document } from 'mongoose';

export interface ITask extends Document {
  readonly timeIn: string;
  readonly timeOut: string;
  readonly description: string;
}
