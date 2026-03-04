import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('admin-runs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/runs')
export class AdminRunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get(':status')
  @ApiOperation({ summary: 'Get all run entries filtered by status' })
  @ApiParam({ name: 'status', enum: ['PENDING', 'ACCEPTED', 'REJECTED'] })
  @ApiResponse({ status: 200, description: 'Return filtered runs.' })
  findByStatus(@Param('status') status: string) {
    return this.runsService.findByStatus(status);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept a run entry' })
  @ApiParam({ name: 'id', description: 'The run ID' })
  @ApiResponse({ status: 200, description: 'Run accepted successfully.' })
  @ApiResponse({ status: 404, description: 'Run not found.' })
  accept(@Param('id') id: string) {
    return this.runsService.updateStatus(id, 'ACCEPTED');
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a run entry' })
  @ApiParam({ name: 'id', description: 'The run ID' })
  @ApiResponse({ status: 200, description: 'Run rejected successfully.' })
  @ApiResponse({ status: 404, description: 'Run not found.' })
  reject(@Param('id') id: string) {
    return this.runsService.updateStatus(id, 'REJECTED');
  }
}
