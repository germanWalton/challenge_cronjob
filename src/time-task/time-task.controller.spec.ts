import { Test, TestingModule } from '@nestjs/testing';
import { TimeTaskController } from './time-task.controller';

describe('TimeTaskController', () => {
  let controller: TimeTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeTaskController],
    }).compile();

    controller = module.get<TimeTaskController>(TimeTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
