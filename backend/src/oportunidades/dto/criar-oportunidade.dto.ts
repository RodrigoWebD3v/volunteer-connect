import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CriarOportunidadeDto {
  @IsString()
  @MaxLength(140)
  titulo!: string;

  @IsString()
  @MaxLength(5000)
  descricao!: string;

  @IsString()
  @MaxLength(80)
  tipoAtividade!: string;

  @IsString()
  @MaxLength(120)
  cidade!: string;

  @IsString()
  @MaxLength(2)
  estado!: string;

  @IsDateString()
  dataInicio!: string;

  @IsDateString()
  dataFim!: string;

  @IsDateString()
  prazoInscricao!: string;

  @IsInt()
  @Min(1)
  quantidadeVagas!: number;

  @IsOptional()
  @IsIn(['rascunho', 'publicada'])
  status?: 'rascunho' | 'publicada';
}
