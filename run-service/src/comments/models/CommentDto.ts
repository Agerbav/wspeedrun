import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The run ID' })
    run_id: string;

    @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'The user ID' })
    user_id: string;

    @ApiProperty({ example: 'This run was amazing!', description: 'The comment text' })
    comment: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}