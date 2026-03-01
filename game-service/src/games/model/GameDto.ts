import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ description: 'The name of the game' })
  name: string;

  @ApiProperty({ description: 'The description of the game' })
  description: string;
}

export class UpdateGameDto {
  @ApiProperty({ description: 'The name of the game', required: false })
  name?: string;

  @ApiProperty({ description: 'The description of the game', required: false })
  description?: string;
}
