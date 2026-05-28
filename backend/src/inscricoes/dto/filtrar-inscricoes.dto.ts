import { IsIn, IsOptional } from 'class-validator';

export class FiltrarInscricoesDto {
  @IsOptional()
  @IsIn(['pendente', 'aprovada', 'reprovada', 'cancelada'])
  status?: 'pendente' | 'aprovada' | 'reprovada' | 'cancelada';
}
