import { Module } from '@nestjs/common';
import { RunCategoriesService } from './run_categories.service';
import { RunCategoriesController } from './run_categories.controller';
import { PublicCategoriesController } from './public-categories.controller';

@Module({
  controllers: [RunCategoriesController, PublicCategoriesController],
  providers: [RunCategoriesService],
})
export class RunCategoriesModule {}
