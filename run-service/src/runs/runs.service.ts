import { Injectable } from '@nestjs/common';
import { CreateRunDto, UpdateRunDto } from './models/RunDto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RunsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRunDto: CreateRunDto) {
    return this.databaseService.run.create({ data: createRunDto });
  }

  async findAll() {
    return this.databaseService.run.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.run.findUnique({ where: { id } });
  }

  async update(id: string, updateRunDto: UpdateRunDto) {
    return this.databaseService.run.update({
      where: { id },
      data: updateRunDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.run.delete({ where: { id } });
  }
}
