import {
  Controller,
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

@ApiTags('admin-categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/categories')
export class RunCategoriesController {
  constructor(private readonly runCategoriesService: RunCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new run category record' })
  @ApiBody({ type: CreateRunCategoryDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'The run category has been successfully created.',
  })
  create(@Body() createRunCategoryDto: CreateRunCategoryDto) {
    return this.runCategoriesService.create(createRunCategoryDto);
  }

  @Patch(':id/update')
  @ApiOperation({ summary: "Update run category's details" })
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

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete run category' })
  @ApiResponse({
    status: 200,
    description: 'The run category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Run category not found.' })
  remove(@Param('id') id: string) {
    return this.runCategoriesService.remove(id);
  }
}
