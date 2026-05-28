import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class AvaliarInscricaoDto {
  @IsIn(['aprovada', 'reprovada'])
  status!: 'aprovada' | 'reprovada';

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacaoOng?: string;
}
