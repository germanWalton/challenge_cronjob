import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from './interfaces/task.interface';
import { TaskDto } from './task.dto';

const taskProjection = {
  __v: false,
};

@Injectable()
export class TimeTaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}
  public async getTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskModel.find({}, taskProjection).exec();
    if (!tasks || !tasks[0]) {
      throw new HttpException('Not found', 404);
    }
    return tasks;
  }
  public async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskModel.findOne({ id }, taskProjection).exec();
    if (!task) {
      throw new HttpException('Not found', 404);
    }
    return task;
  }
  public async createTask(newTask: TaskDto) {
    const task = await new this.taskModel(newTask);
    return task.save();
  }
  public async deleteTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task.$isDeleted) {
      throw new HttpException('Not found', 404);
    }
    return task;
  }
  public async updateTaskById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<TaskDto> {
    const task = await this.taskModel
      .findOneAndUpdate(
        { id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    if (!task) {
      throw new HttpException('Not found', 404);
    }
    return task;
  }
}
