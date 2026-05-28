import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class AtualizarOportunidadeDto {
  @IsOptional()
  @IsString()
  @MaxLength(140)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  descricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  tipoAtividade?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  cidade?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  estado?: string;

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @IsOptional()
  @IsDateString()
  prazoInscricao?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantidadeVagas?: number;

  @IsOptional()
  @IsIn(['rascunho', 'publicada', 'encerrada', 'cancelada'])
  status?: 'rascunho' | 'publicada' | 'encerrada' | 'cancelada';
}
