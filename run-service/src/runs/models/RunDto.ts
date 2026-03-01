import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRunDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The run category ID' })
  run_category_id: string;

  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The user ID' })
  user_id: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'The VOD URL' })
  vod_url: string;

  @ApiProperty({ example: 3600, description: 'The run duration in seconds' })
  run_duration: bigint | number;
}

export class UpdateRunDto extends PartialType(CreateRunDto) {}
