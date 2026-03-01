import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGameDto: Prisma.GameCreateInput) {
    return this.databaseService.game.create({ data: createGameDto });
  }

  findAll() {
    return this.databaseService.game.findMany({});
  }

  findOne(id: string) {
    return this.databaseService.game.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateGameDto: Prisma.GameUpdateInput) {
    return this.databaseService.game.update({
      where: {
        id,
      },
      data: updateGameDto,
    });
  }

  remove(id: string) {
    return this.databaseService.game.delete({ where: { id } });
  }
}
