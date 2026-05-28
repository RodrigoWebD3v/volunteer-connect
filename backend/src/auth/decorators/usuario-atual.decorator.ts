import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface UsuarioAtualPayload {
  id: string;
  papel: 'voluntario' | 'ong' | 'admin';
  ativo?: boolean | null;
  conta_suspensa?: boolean | null;
}

interface RequestComUsuario extends Request {
  usuario?: UsuarioAtualPayload;
}

export const UsuarioAtual = createParamDecorator(
  (
    _data: unknown,
    context: ExecutionContext,
  ): UsuarioAtualPayload | undefined => {
    const request = context.switchToHttp().getRequest<RequestComUsuario>();
    return request.usuario;
  },
);
