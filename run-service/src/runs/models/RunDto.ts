import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The run category ID' })
  @IsString()
  @IsNotEmpty()
  run_category_id: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'The VOD URL' })
  @IsUrl()
  @IsNotEmpty()
  vod_url: string;

  @ApiProperty({ example: 3600, description: 'The run duration in seconds' })
  @IsNumber()
  @IsNotEmpty()
  run_duration: number;
}

export class UpdateRunDto extends PartialType(CreateRunDto) {}
