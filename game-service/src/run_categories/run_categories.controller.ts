import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RunCategoriesService } from './run_categories.service';
import {
  CreateRunCategoryDto,
  UpdateRunCategoryDto,
} from './model/RunCategoryDto';

@ApiTags('run-categories')
@Controller('run-categories')
export class RunCategoriesController {
  constructor(private readonly runCategoriesService: RunCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new run category' })
  @ApiBody({ type: CreateRunCategoryDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'The run category has been successfully created.',
  })
  create(@Body() createRunCategoryDto: CreateRunCategoryDto) {
    return this.runCategoriesService.create(createRunCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all run categories' })
  @ApiResponse({ status: 200, description: 'Return all run categories.' })
  findAll() {
    return this.runCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a run category by ID' })
  @ApiResponse({ status: 200, description: 'Return a run category.' })
  @ApiResponse({ status: 404, description: 'Run category not found.' })
  findOne(@Param('id') id: string) {
    return this.runCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a run category by ID' })
  @ApiBody({ type: UpdateRunCategoryDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'The run category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Run category not found.' })
  update(
    @Param('id') id: string,
    @Body() updateRunCategoryDto: UpdateRunCategoryDto,
  ) {
    return this.runCategoriesService.update(id, updateRunCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a run category by ID' })
  @ApiResponse({
    status: 200,
    description: 'The run category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Run category not found.' })
  remove(@Param('id') id: string) {
    return this.runCategoriesService.remove(id);
  }
}
