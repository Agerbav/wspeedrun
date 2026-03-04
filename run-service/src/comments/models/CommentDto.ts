import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The run ID' })
  @IsUUID()
  @IsNotEmpty()
  run_id: string;

  @ApiProperty({ example: 'Great run!', description: 'The comment text' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
