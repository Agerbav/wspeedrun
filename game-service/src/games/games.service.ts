import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateGameDto, UpdateGameDto } from './model/GameDto.js';

@Injectable()
export class GamesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGameDto: CreateGameDto) {
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

  update(id: string, updateGameDto: UpdateGameDto) {
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
