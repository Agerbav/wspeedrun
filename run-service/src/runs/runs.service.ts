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

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours} Hour(s) ${minutes} Minute(s) ${secs} Second(s)`;
  }

  async create(data: any) {
    const gameServiceUrl = this.configService.get<string>('GAME_SERVICE_URL', 'http://localhost:3001');
    
    try {
      await lastValueFrom(
        this.httpService.get(`${gameServiceUrl}/categories/${data.run_category_id}`)
      );
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Run category with ID ${data.run_category_id} not found`);
      }
      throw new InternalServerErrorException('Failed to communicate with game-service');
    }

    return this.databaseService.run.create({ 
      data: {
        ...data,
        status: 'PENDING'
      } 
    });
  }

  async findByCategory(categoryId: string) {
    const gameServiceUrl = this.configService.get<string>('GAME_SERVICE_URL', 'http://localhost:3001');
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL', 'http://localhost:3000');

    let categoryData;
    try {
      const resp = await lastValueFrom(this.httpService.get(`${gameServiceUrl}/categories/${categoryId}`));
      categoryData = resp.data;
    } catch (e) {
      throw new NotFoundException('Category not found');
    }

    const runs = await this.databaseService.run.findMany({
      where: { run_category_id: categoryId, status: 'ACCEPTED' },
      orderBy: { run_duration: 'asc' }
    });

    return Promise.all(runs.map(async (run) => {
      let userData = { username: 'Unknown' };
      try {
        const userResp = await lastValueFrom(this.httpService.get(`${authServiceUrl}/users/${run.user_id}/profile`));
        userData = userResp.data;
      } catch (e) {}

      return {
        id: run.id,
        runner: userData,
        game: categoryData.game,
        category_name: categoryData.name,
        duration: this.formatDuration(Number(run.run_duration)),
        vod_url: run.vod_url,
        status: run.status
      };
    }));
  }

  async findByUser(targetUserId: string, authUser: any) {
    const filter = { user_id: targetUserId } as any;
    if (authUser.userId !== targetUserId) {
      filter.status = 'ACCEPTED';
    }
    return this.databaseService.run.findMany({ where: filter });
  }

  async findByStatus(status: string) {
    return this.databaseService.run.findMany({
      where: { status: status.toUpperCase() }
    });
  }

  async updateStatus(id: string, status: string) {
    const run = await this.databaseService.run.findUnique({ where: { id } });
    if (!run) throw new NotFoundException('Run not found');

    return this.databaseService.run.update({
      where: { id },
      data: { 
        status: status.toUpperCase(),
        verified_at: status.toUpperCase() === 'ACCEPTED' ? new Date() : null
      }
    });
  }

  async findOne(id: string) {
    const run = await this.databaseService.run.findUnique({ 
      where: { id },
      include: { comments: true }
    });
    if (!run) throw new NotFoundException('Run not found');

    const gameServiceUrl = this.configService.get<string>('GAME_SERVICE_URL', 'http://localhost:3001');
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL', 'http://localhost:3000');

    const [catResp, userResp] = await Promise.allSettled([
      lastValueFrom(this.httpService.get(`${gameServiceUrl}/categories/${run.run_category_id}`)),
      lastValueFrom(this.httpService.get(`${authServiceUrl}/users/${run.user_id}/profile`))
    ]);

    return {
      ...run,
      duration_formatted: this.formatDuration(Number(run.run_duration)),
      category: catResp.status === 'fulfilled' ? catResp.value.data : null,
      runner: userResp.status === 'fulfilled' ? userResp.value.data : null
    };
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
