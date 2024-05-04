import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export enum STATUS {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  @ValidateIf((x) => x.hasOwnProperty('title'))
  title: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ValidateIf((x) => x.hasOwnProperty('description'))
  description: string;

  @IsEnum(STATUS)
  @ValidateIf((x) => x.hasOwnProperty('status'))
  status: string;
}
