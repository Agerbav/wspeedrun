import { ApiProperty } from '@nestjs/swagger';

export class CreateRunCategoryDto {
  @ApiProperty({ description: 'The ID of the game this category belongs to' })
  game_id: string;

  @ApiProperty({ description: 'The name of the run category' })
  name: string;
}

export class UpdateRunCategoryDto {
  @ApiProperty({
    description: 'The ID of the game this category belongs to',
    required: false,
  })
  game_id?: string;

  @ApiProperty({ description: 'The name of the run category', required: false })
  name?: string;
}
