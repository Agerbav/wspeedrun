import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { DatabaseModule } from './database/database.module.js';
import { RunCategoriesModule } from './run_categories/run_categories.module';
import { GamesModule } from './games/games.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    DatabaseModule,
    GamesModule,
    RunCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
