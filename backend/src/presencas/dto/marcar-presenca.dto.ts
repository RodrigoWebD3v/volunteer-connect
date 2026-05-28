import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class MarcarPresencaDto {
  @IsUUID()
  inscricaoId!: string;

  @IsIn(['presente', 'ausente', 'cancelada'])
  status!: 'presente' | 'ausente' | 'cancelada';

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observacao?: string;
}
