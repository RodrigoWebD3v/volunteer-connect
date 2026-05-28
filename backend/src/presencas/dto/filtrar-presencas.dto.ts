import { IsIn, IsOptional } from 'class-validator';

export class FiltrarPresencasDto {
  @IsOptional()
  @IsIn(['presente', 'ausente', 'cancelada'])
  status?: 'presente' | 'ausente' | 'cancelada';
}
