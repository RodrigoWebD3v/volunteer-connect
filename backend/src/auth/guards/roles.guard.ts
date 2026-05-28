import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { UsuarioAtualPayload } from '../decorators/usuario-atual.decorator';

interface RequestComUsuario extends Request {
  usuario?: UsuarioAtualPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<
      Array<'voluntario' | 'ong' | 'admin'>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestComUsuario>();
    const usuario = request.usuario;

    if (!usuario || !roles.includes(usuario.papel)) {
      throw new ForbiddenException('Papel de usuario sem permissao.');
    }

    if (usuario.conta_suspensa === true || usuario.ativo === false) {
      throw new ForbiddenException(
        'Conta suspensa nao pode executar esta acao.',
      );
    }

    return true;
  }
}
