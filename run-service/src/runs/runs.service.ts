import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateRunDto, UpdateRunDto } from './models/RunDto';
import { DatabaseService } from 'src/database/database.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RunsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createRunDto: CreateRunDto) {
    const gameServiceUrl = this.configService.get<string>('GAME_SERVICE_URL', 'http://localhost:3001');
    
    try {
      await lastValueFrom(
        this.httpService.get(`${gameServiceUrl}/run-categories/${createRunDto.run_category_id}`)
      );
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Run category with ID ${createRunDto.run_category_id} not found in game-service`);
      }
      throw new InternalServerErrorException('Failed to communicate with game-service');
    }

    return this.databaseService.run.create({ data: createRunDto });
  }

  async findAll() {
    return this.databaseService.run.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.run.findUnique({ where: { id } });
  }

  async update(id: string, updateRunDto: UpdateRunDto) {
    return this.databaseService.run.update({
      where: { id },
      data: updateRunDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.run.delete({ where: { id } });
  }
}
