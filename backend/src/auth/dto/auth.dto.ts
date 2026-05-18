import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegistrarDto {
  @IsString()
  nomeCompleto!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsIn(['voluntario', 'ong'])
  tipoCadastro!: 'voluntario' | 'ong';

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  biografia?: string;

  @ValidateIf((o: RegistrarDto) => o.tipoCadastro === 'ong')
  @IsString()
  nomeFantasia?: string;

  @ValidateIf((o: RegistrarDto) => o.tipoCadastro === 'ong')
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  descricaoOng?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  siteUrl?: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class LogoutDto {
  @IsString()
  accessToken!: string;
}

export class EnviarRecuperacaoSenhaDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  redirectTo?: string;
}
