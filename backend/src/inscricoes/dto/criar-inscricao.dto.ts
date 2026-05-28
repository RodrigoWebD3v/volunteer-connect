import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CriarInscricaoDto {
  @IsOptional()
  @IsString()
  @MaxLength(1200)
  mensagem?: string;
}
