import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './models/CommentDto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.databaseService.comment.create({ data: createCommentDto });
  }

  async findAll() {
    return this.databaseService.comment.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.databaseService.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.comment.delete({ where: { id } });
  }
}
