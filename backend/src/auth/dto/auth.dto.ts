import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

function emptyStringToUndefined({ value }: { value: unknown }) {
  return typeof value === 'string' && value.trim() === '' ? undefined : value;
}

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

  @ValidateIf((o: RegistrarDto) => o.tipoCadastro === 'voluntario')
  @IsString()
  @Matches(/^\d{11}$/)
  cpf?: string;

  @IsOptional()
  @IsString()
  descricaoOng?: string;

  @IsOptional()
  @Transform(emptyStringToUndefined)
  @IsUrl({ require_tld: false })
  siteUrl?: string;

  @ValidateIf((o: RegistrarDto) => o.tipoCadastro === 'ong')
  @IsString()
  logoDataUrl?: string;
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
  @Transform(emptyStringToUndefined)
  @IsUrl({ require_tld: false })
  redirectTo?: string;
}
