import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GamesService } from './games.service.js';

@ApiTags('games')
@Controller('games')
export class PublicGamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'Return all games.' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by ID' })
  @ApiResponse({ status: 200, description: 'Return a game.' })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }
}
