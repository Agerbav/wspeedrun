import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './models/CommentDto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const run = await this.databaseService.run.findUnique({
      where: { id: createCommentDto.run_id },
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${createCommentDto.run_id} not found`);
    }

    return this.databaseService.comment.create({
      data: {
        ...createCommentDto,
        user_id: userId,
      },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.databaseService.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    return this.databaseService.comment.delete({
      where: { id },
    });
  }
}
