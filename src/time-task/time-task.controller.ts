import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { TimeTaskService } from './time-task.service';

@Controller('time-task')
export class TimeTaskController {
  constructor(private timeTaskService: TimeTaskService) {}
  @Get()
  public getTasks() {
    return this.timeTaskService.getTasks();
  }
  @Get(':id')
  public async getTaskById(@Param('id') id: number) {
    return this.timeTaskService.getTaskById(id);
  }
  @Delete(':id')
  public async deleteTaskById(@Param('id') id: number) {
    return this.timeTaskService.deleteTaskById(id);
  }
  @Put(':id')
  public async updateTaskById(
    @Param('id')
    id: number,
    @Query() query,
  ) {
    const propertyName = query.propertyName;
    const propertyValue = query.propertyValue;
    return this.timeTaskService.updateTaskById(id, propertyName, propertyValue);
  }
  @Post()
  public createTask() {
    return this.timeTaskService.createTask();
  }
}
