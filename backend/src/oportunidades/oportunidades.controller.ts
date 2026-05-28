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
import { AtualizarOportunidadeDto } from './dto/atualizar-oportunidade.dto';
import { CriarOportunidadeDto } from './dto/criar-oportunidade.dto';
import { FiltrarOportunidadesDto } from './dto/filtrar-oportunidades.dto';
import { OportunidadesService } from './oportunidades.service';

@Controller('oportunidades')
export class OportunidadesController {
  constructor(private readonly oportunidadesService: OportunidadesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  listarPublicas(@Query() filtros: FiltrarOportunidadesDto) {
    return this.oportunidadesService.listarPublicas(filtros);
  }

  @Get('minhas')
  @HttpCode(HttpStatus.OK)
  listarMinhas(@Headers('authorization') authorization?: string) {
    return this.oportunidadesService.listarMinhas(
      this.extrairBearerToken(authorization),
    );
  }

  @Get('minhas/:id')
  @HttpCode(HttpStatus.OK)
  detalharMinha(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.oportunidadesService.detalharMinha(
      this.extrairBearerToken(authorization),
      id,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: CriarOportunidadeDto,
  ) {
    return this.oportunidadesService.criar(
      this.extrairBearerToken(authorization),
      body,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  atualizar(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AtualizarOportunidadeDto,
  ) {
    return this.oportunidadesService.atualizar(
      this.extrairBearerToken(authorization),
      id,
      body,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  detalharPublica(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.oportunidadesService.detalharPublica(id);
  }

  private extrairBearerToken(authorization?: string): string {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token ausente.');
    }

    return authorization.slice(7);
  }
}
