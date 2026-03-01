import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateRunCategoryDto,
  UpdateRunCategoryDto,
} from './model/RunCategoryDto';

@Injectable()
export class RunCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRunCategoryDto: CreateRunCategoryDto) {
    return this.databaseService.runCategory.create({
      data: createRunCategoryDto,
    });
  }

  async findAll() {
    return this.databaseService.runCategory.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.runCategory.findUnique({ where: { id } });
  }

  async update(id: string, updateRunCategoryDto: UpdateRunCategoryDto) {
    return this.databaseService.runCategory.update({
      where: { id },
      data: updateRunCategoryDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.runCategory.delete({ where: { id } });
  }
}
