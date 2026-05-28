import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AnalisarOngDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  motivoReprovacao?: string;
}
