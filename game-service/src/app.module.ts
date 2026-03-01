import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { GamesModule } from './games/games.module.js';
import { ConfigModule } from '@nestjs/config';
import { RunCategoriesModule } from './run_categories/run_categories.module';

@Module({
  imports: [
    DatabaseModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RunCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
