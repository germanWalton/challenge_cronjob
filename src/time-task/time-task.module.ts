import { Module } from '@nestjs/common';
import { TimeTaskController } from './time-task.controller';
import { TimeTaskService } from './time-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Task',
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TimeTaskController],
  providers: [TimeTaskService],
})
export class TimeTaskModule {}
