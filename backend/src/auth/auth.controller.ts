import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  EnviarRecuperacaoSenhaDto,
  LoginDto,
  LogoutDto,
  RegistrarDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registrar')
  @HttpCode(HttpStatus.CREATED)
  async registrar(@Body() body: RegistrarDto) {
    const user = await this.authService.registrar({
      nomeCompleto: body.nomeCompleto,
      email: body.email,
      password: body.password,
      tipoCadastro: body.tipoCadastro,
      telefone: body.telefone,
      cidade: body.cidade,
      estado: body.estado,
      biografia: body.biografia,
      nomeFantasia: body.nomeFantasia,
      cnpj: body.cnpj,
      descricaoOng: body.descricaoOng,
      siteUrl: body.siteUrl,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const data = await this.authService.login({
      email: body.email,
      password: body.password,
    });

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
      user: data.user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() body: LogoutDto): Promise<void> {
    await this.authService.logout(body.accessToken);
  }

  @Post('recuperar-senha')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recuperarSenha(@Body() body: EnviarRecuperacaoSenhaDto): Promise<void> {
    await this.authService.enviarRecuperacaoSenha(body.email, body.redirectTo);
  }
}
