import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GamesService } from './games.service.js';
import { CreateGameDto, UpdateGameDto } from './model/GameDto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('admin-games')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiBody({ type: CreateGameDto, required: true })
  @ApiResponse({ status: 201, description: 'The game has been successfully created.' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Patch(':id/update')
  @ApiOperation({ summary: 'Update a game by ID' })
  @ApiBody({ type: UpdateGameDto, required: true })
  @ApiResponse({ status: 200, description: 'The game has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a game by ID' })
  @ApiResponse({ status: 200, description: 'The game has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}

