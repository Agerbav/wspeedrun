import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateRunCategoryDto,
  UpdateRunCategoryDto,
} from './model/RunCategoryDto';

@Injectable()
export class RunCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRunCategoryDto: CreateRunCategoryDto) {
    const game = await this.databaseService.game.findUnique({
      where: { id: createRunCategoryDto.game_id },
    });
    
    if (!game) {
      throw new NotFoundException(`Game with ID ${createRunCategoryDto.game_id} not found`);
    }

    return this.databaseService.runCategory.create({
      data: createRunCategoryDto,
    });
  }

  async findAll() {
    return this.databaseService.runCategory.findMany({});
  }

  async findOne(id: string) {
    const category = await this.databaseService.runCategory.findUnique({ 
      where: { id },
      include: { game: true }
    });
    if (!category) throw new NotFoundException('Run category not found');
    return category;
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
