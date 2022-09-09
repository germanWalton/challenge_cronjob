import { Test, TestingModule } from '@nestjs/testing';
import { TimeTaskService } from './time-task.service';

describe('TimeTaskService', () => {
  let service: TimeTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeTaskService],
    }).compile();

    service = module.get<TimeTaskService>(TimeTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
