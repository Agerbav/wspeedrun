import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get user profile information' })
  @ApiParam({ name: 'id', description: 'The user ID' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getProfile(@Param('id') id: string) {
    const user = await this.authService.getProfile(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
