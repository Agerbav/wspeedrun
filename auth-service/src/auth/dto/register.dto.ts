import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'customEmail', async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    if (!email || typeof email !== 'string') return false;

    const atParts = email.split('@');
    if (atParts.length !== 2) return false;

    if (!email.includes('.')) return false;

    const atIndex = email.indexOf('@');
    if (email[atIndex - 1] === '.' || email[atIndex + 1] === '.') return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'email format is invalid (exactly one @, at least one dot, and no adjacency)';
  }
}

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    if (!password || typeof password !== 'string') return false;

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;

    for (const char of password) {
      if (char >= 'A' && char <= 'Z') hasUpper = true;
      else if (char >= 'a' && char <= 'z') hasLower = true;
      else if (char >= '0' && char <= '9') hasNumber = true;
      else if (char.trim() !== '') hasSpecial = true;
    }

    return hasUpper && hasLower && hasNumber && hasSpecial;
  }

  defaultMessage(args: ValidationArguments) {
    return 'password must contain at least one uppercase, lowercase, number, and special character';
  }
}

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'User username (4-40 characters)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @ApiProperty({ example: 'user@example.com', description: 'Custom email validation' })
  @IsString()
  @IsNotEmpty()
  @Validate(CustomEmailValidator)
  email: string;

  @ApiProperty({ example: 'Password123!', description: '8-40 chars, complex' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @Validate(CustomPasswordValidator)
  password: string;

  @ApiProperty({ example: 'Indonesia', description: 'User country' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
