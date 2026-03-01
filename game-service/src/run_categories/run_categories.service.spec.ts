import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoriesService } from './run_categories.service';

describe('RunCategoriesService', () => {
  let service: RunCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunCategoriesService],
    }).compile();

    service = module.get<RunCategoriesService>(RunCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
