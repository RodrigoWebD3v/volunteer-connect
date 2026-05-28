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
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AvaliarInscricaoDto } from './dto/avaliar-inscricao.dto';
import { CriarInscricaoDto } from './dto/criar-inscricao.dto';
import { FiltrarInscricoesDto } from './dto/filtrar-inscricoes.dto';
import { InscricoesService } from './inscricoes.service';

@Controller('inscricoes')
export class InscricoesController {
  constructor(private readonly inscricoesService: InscricoesService) {}

  @Post('oportunidades/:oportunidadeId')
  @HttpCode(HttpStatus.CREATED)
  criar(
    @Headers('authorization') authorization: string | undefined,
    @Param('oportunidadeId', new ParseUUIDPipe()) oportunidadeId: string,
    @Body() body: CriarInscricaoDto,
  ) {
    return this.inscricoesService.criar(
      this.extrairBearerToken(authorization),
      oportunidadeId,
      body,
    );
  }

  @Get('minhas')
  @HttpCode(HttpStatus.OK)
  listarMinhas(
    @Headers('authorization') authorization: string | undefined,
    @Query() filtros: FiltrarInscricoesDto,
  ) {
    return this.inscricoesService.listarMinhas(
      this.extrairBearerToken(authorization),
      filtros,
    );
  }

  @Patch(':id/cancelar')
  @HttpCode(HttpStatus.OK)
  cancelar(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.inscricoesService.cancelar(
      this.extrairBearerToken(authorization),
      id,
    );
  }

  @Get('oportunidades/:oportunidadeId')
  @HttpCode(HttpStatus.OK)
  listarDaOportunidade(
    @Headers('authorization') authorization: string | undefined,
    @Param('oportunidadeId', new ParseUUIDPipe()) oportunidadeId: string,
    @Query() filtros: FiltrarInscricoesDto,
  ) {
    return this.inscricoesService.listarDaOportunidade(
      this.extrairBearerToken(authorization),
      oportunidadeId,
      filtros,
    );
  }

  @Patch(':id/avaliar')
  @HttpCode(HttpStatus.OK)
  avaliar(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AvaliarInscricaoDto,
  ) {
    return this.inscricoesService.avaliar(
      this.extrairBearerToken(authorization),
      id,
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
