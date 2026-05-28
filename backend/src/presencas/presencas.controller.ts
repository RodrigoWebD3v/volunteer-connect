import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { FiltrarPresencasDto } from './dto/filtrar-presencas.dto';
import { MarcarPresencaDto } from './dto/marcar-presenca.dto';
import { PresencasService } from './presencas.service';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @Get('minhas')
  @HttpCode(HttpStatus.OK)
  listarMinhas(@Headers('authorization') authorization?: string) {
    return this.presencasService.listarMinhas(
      this.extrairBearerToken(authorization),
    );
  }

  @Get('oportunidades/:oportunidadeId')
  @HttpCode(HttpStatus.OK)
  listarDaOportunidade(
    @Headers('authorization') authorization: string | undefined,
    @Param('oportunidadeId', new ParseUUIDPipe()) oportunidadeId: string,
    @Query() filtros: FiltrarPresencasDto,
  ) {
    return this.presencasService.listarDaOportunidade(
      this.extrairBearerToken(authorization),
      oportunidadeId,
      filtros,
    );
  }

  @Patch('oportunidades/:oportunidadeId')
  @HttpCode(HttpStatus.OK)
  marcar(
    @Headers('authorization') authorization: string | undefined,
    @Param('oportunidadeId', new ParseUUIDPipe()) oportunidadeId: string,
    @Body() body: MarcarPresencaDto,
  ) {
    return this.presencasService.marcar(
      this.extrairBearerToken(authorization),
      oportunidadeId,
      body,
    );
  }

  private extrairBearerToken(authorization?: string): string {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token ausente.');
    }

    return authorization.slice(7);
  }
}
