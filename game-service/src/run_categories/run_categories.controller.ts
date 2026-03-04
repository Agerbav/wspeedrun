import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RunCategoriesService } from './run_categories.service';
import {
  CreateRunCategoryDto,
  UpdateRunCategoryDto,
} from './model/RunCategoryDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('run-categories')
@Controller('run-categories')
export class RunCategoriesController {
  constructor(private readonly runCategoriesService: RunCategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
