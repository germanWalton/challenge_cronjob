import { Module } from '@nestjs/common';
import { TimeTaskController } from './time-task.controller';
import { TimeTaskService } from './time-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { ChatGateway } from './socket-backend/chat.gateway';

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
  providers: [TimeTaskService, ChatGateway],
})
export class TimeTaskModule {}
