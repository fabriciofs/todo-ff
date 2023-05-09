import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  isDone: boolean;
}
