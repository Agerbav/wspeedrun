import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { CreateRunDto, UpdateRunDto } from './models/RunDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('runs')
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create new run entry' })
  @ApiBody({ type: CreateRunDto })
  @ApiResponse({ status: 201, description: 'The run entry has been successfully created.' })
  create(@Body() createRunDto: CreateRunDto, @Request() req) {
    const runData = {
      ...createRunDto,
      user_id: req.user.userId,
    };
    return this.runsService.create(runData);
  }

  @Get(':id/category')
  @ApiOperation({ summary: 'List of all runs by run category' })
  @ApiParam({ name: 'id', description: 'The category ID' })
  findByCategory(@Param('id') id: string) {
    return this.runsService.findByCategory(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id/user')
  @ApiOperation({ summary: 'List of all runs by user' })
  @ApiParam({ name: 'id', description: 'The user ID' })
  findByUser(@Param('id') id: string, @Request() req) {
    return this.runsService.findByUser(id, req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get run's details" })
  @ApiParam({ name: 'id', description: 'The run ID' })
  findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRunDto: UpdateRunDto) {
    return this.runsService.update(id, updateRunDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.runsService.remove(id);
  }
}
