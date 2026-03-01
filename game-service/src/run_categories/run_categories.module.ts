import { Module } from '@nestjs/common';
import { RunCategoriesService } from './run_categories.service';
import { RunCategoriesController } from './run_categories.controller';

@Module({
  controllers: [RunCategoriesController],
  providers: [RunCategoriesService],
})
export class RunCategoriesModule {}
