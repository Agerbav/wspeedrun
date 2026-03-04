import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RunCategoriesService } from './run_categories.service';

@ApiTags('categories')
@Controller('categories')
export class PublicCategoriesController {
  constructor(private readonly runCategoriesService: RunCategoriesService) {}

  @Get(':id')
  @ApiOperation({ summary: "Get run category's details" })
  @ApiResponse({ status: 200, description: 'Return run category details.' })
  @ApiResponse({ status: 404, description: 'Run category not found.' })
  findOne(@Param('id') id: string) {
    return this.runCategoriesService.findOne(id);
  }
}
