import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoriesController } from './run_categories.controller';
import { RunCategoriesService } from './run_categories.service';

describe('RunCategoriesController', () => {
  let controller: RunCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunCategoriesController],
      providers: [RunCategoriesService],
    }).compile();

    controller = module.get<RunCategoriesController>(RunCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
