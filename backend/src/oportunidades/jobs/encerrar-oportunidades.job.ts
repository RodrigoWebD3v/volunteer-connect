import { Injectable } from '@nestjs/common';
import { OportunidadesService } from '../oportunidades.service';

@Injectable()
export class EncerrarOportunidadesJob {
  constructor(private readonly oportunidadesService: OportunidadesService) {}

  executarAgora() {
    return this.oportunidadesService.encerrarExpiradas();
  }
}
