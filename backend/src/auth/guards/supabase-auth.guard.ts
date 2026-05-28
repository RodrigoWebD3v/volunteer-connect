import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { SupabaseService } from '../../supabase/supabase.service';
import type { UsuarioAtualPayload } from '../decorators/usuario-atual.decorator';

interface RequestComUsuario extends Request {
  usuario?: UsuarioAtualPayload;
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestComUsuario>();
    const token = this.extrairBearerToken(request);
    const { data: authData, error: authError } =
      await this.supabaseService.adminClient.auth.getUser(token);

    if (authError || !authData.user) {
      throw new UnauthorizedException('Token invalido ou expirado.');
    }

    const { data, error } = await this.supabaseService.adminClient
      .from('usuarios')
      .select('id,papel,ativo,conta_suspensa')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (error || !data) {
      throw new UnauthorizedException('Usuario local nao encontrado.');
    }

    request.usuario = data as UsuarioAtualPayload;
    return true;
  }

  private extrairBearerToken(request: Request): string {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token ausente.');
    }

    return authorization.slice(7);
  }
}
