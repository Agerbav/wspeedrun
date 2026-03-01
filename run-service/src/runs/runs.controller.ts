import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { CreateRunDto, UpdateRunDto } from './models/RunDto';

@ApiTags('runs')
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new run' })
  @ApiBody({ type: CreateRunDto })
  @ApiResponse({ status: 201, description: 'The run has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createRunDto: CreateRunDto) {
    return this.runsService.create(createRunDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all runs' })
  @ApiResponse({ status: 200, description: 'Return all runs.' })
  findAll() {
    return this.runsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific run by ID' })
  @ApiParam({ name: 'id', description: 'The run ID' })
  @ApiResponse({ status: 200, description: 'Return the specific run.' })
  @ApiResponse({ status: 404, description: 'Run not found.' })
  findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific run' })
  @ApiParam({ name: 'id', description: 'The run ID' })
  @ApiBody({ type: UpdateRunDto })
  @ApiResponse({ status: 200, description: 'The run has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Run not found.' })
  update(@Param('id') id: string, @Body() updateRunDto: UpdateRunDto) {
    return this.runsService.update(id, updateRunDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific run' })
  @ApiParam({ name: 'id', description: 'The run ID' })
  @ApiResponse({ status: 200, description: 'The run has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Run not found.' })
  remove(@Param('id') id: string) {
    return this.runsService.remove(id);
  }
}
