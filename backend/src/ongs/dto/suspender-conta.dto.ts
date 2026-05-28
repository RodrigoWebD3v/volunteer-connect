import { IsString, MaxLength, MinLength } from 'class-validator';

export class SuspenderContaDto {
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  motivo!: string;
}
