import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsController } from './runs.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [HttpModule, PassportModule],
  controllers: [RunsController],
  providers: [RunsService, JwtStrategy],
})
export class RunsModule {}
