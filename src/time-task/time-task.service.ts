import { Injectable, HttpException, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from './interfaces/task.interface';
import { TaskDto } from './task.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import { faker } from '@faker-js/faker/locale/de';

const taskProjection = {
  __v: false,
};

@Injectable()
export class TimeTaskService {
  private readonly logger = new Logger(TimeTaskService.name);
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<ITask>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  public async getTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskModel.find({}, taskProjection).exec();
    if (!tasks || !tasks[0]) {
      throw new HttpException('Not found', 404);
    }
    this.logger.log(tasks);
    return tasks;
  }
  public async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskModel.findOne({ id }, taskProjection).exec();
    if (!task) {
      throw new HttpException('Not found', 404);
    }
    return task;
  }
  @Cron('0 */3 * * * *', {
    name: 'add-task',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  public async createTask() {
    const job = this.schedulerRegistry.getCronJob('add-task');
    const timeIn = dayjs().format('DD-MM-YYYY HH:mm:ss [Z] A');
    const timeOut = job.lastDate();
    const formattedTimeOut = dayjs(timeOut).format();
    const randomMinute = Math.ceil(Math.random() * 15);
    const addTimeOut = dayjs(formattedTimeOut)
      .add(randomMinute, 'minute')
      .format();

    const description = faker.git.commitMessage();
    const task = await new this.taskModel({ timeIn, addTimeOut, description });
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
