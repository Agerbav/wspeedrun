import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ description: 'The name of the game' })
  name: string;

  @ApiProperty({ description: 'The description of the game' })
  description: string;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {}
