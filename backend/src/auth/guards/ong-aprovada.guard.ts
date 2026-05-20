import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { SupabaseService } from '../../supabase/supabase.service';

interface RequestComOng extends Request {
  usuario?: {
    id: string;
    papel: string;
  };
  ong?: {
    id: string;
    usuario_gestor_id: string;
    status_analise?: string | null;
  };
}

interface UsuarioGuard {
  id: string;
  papel: string;
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

interface OngGuard {
  id: string;
  usuario_gestor_id: string;
  status_analise?: string | null;
}

@Injectable()
export class OngAprovadaGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestComOng>();
    const token = this.extrairBearerToken(request);
    const authUserId = await this.validarToken(token);
    const usuario = await this.buscarUsuario(authUserId);

    if (
      usuario.papel !== 'ong' ||
      usuario.conta_suspensa === true ||
      usuario.ativo === false
    ) {
      throw new ForbiddenException('Acesso permitido apenas para ONG ativa.');
    }

    const ong = await this.buscarOngAprovada(usuario.id);

    request.usuario = {
      id: usuario.id,
      papel: usuario.papel,
    };
    request.ong = ong;

    return true;
  }

  private extrairBearerToken(request: Request): string {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token ausente.');
    }

    return authorization.slice(7);
  }

  private async validarToken(accessToken: string): Promise<string> {
    const { data, error } =
      await this.supabaseService.adminClient.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }

    return data.user.id;
  }

  private async buscarUsuario(authUserId: string): Promise<UsuarioGuard> {
    const { data, error } = await this.supabaseService.adminClient
      .from('usuarios')
      .select('id,papel,ativo,conta_suspensa')
      .eq('id', authUserId)
      .maybeSingle();

    if (error || !data) {
      throw new UnauthorizedException('Usuario local nao encontrado.');
    }

    return data;
  }

  private async buscarOngAprovada(usuarioId: string): Promise<OngGuard> {
    const { data, error } = await this.supabaseService.adminClient
      .from('perfis_ongs')
      .select('id,usuario_gestor_id,status_analise')
      .eq('usuario_gestor_id', usuarioId)
      .eq('status_analise', 'aprovado')
      .maybeSingle();

    if (error || !data) {
      throw new ForbiddenException('ONG precisa estar aprovada.');
    }

    return data;
  }
}
