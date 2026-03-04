import { Module } from '@nestjs/common';
import { GamesService } from './games.service.js';
import { GamesController } from './games.controller.js';
import { PublicGamesController } from './public-games.controller.js';

@Module({
  controllers: [GamesController, PublicGamesController],
  providers: [GamesService],
})
export class GamesModule {}
