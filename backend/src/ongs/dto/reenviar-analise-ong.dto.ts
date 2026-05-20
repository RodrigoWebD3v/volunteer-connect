import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class ReenviarAnaliseOngDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descricao?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(300)
  siteUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  cidade?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  estado?: string;
}
