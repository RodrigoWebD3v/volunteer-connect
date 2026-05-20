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
import { AnalisarOngDto } from './dto/analisar-ong.dto';
import { ReenviarAnaliseOngDto } from './dto/reenviar-analise-ong.dto';
import { OngsService } from './ongs.service';

@Controller('ongs')
export class OngsController {
  constructor(private readonly ongsService: OngsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  listarPublicas() {
    return this.ongsService.listarPublicas();
  }

  @Get('minha')
  @HttpCode(HttpStatus.OK)
  obterMinhaOng(@Headers('authorization') authorization?: string) {
    return this.ongsService.obterMinhaOng(
      this.extrairBearerToken(authorization),
    );
  }

  @Patch('minha/reenviar-analise')
  @HttpCode(HttpStatus.OK)
  reenviarAnalise(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: ReenviarAnaliseOngDto,
  ) {
    return this.ongsService.reenviarAnalise(
      this.extrairBearerToken(authorization),
      body,
    );
  }

  @Get('admin/analises')
  @HttpCode(HttpStatus.OK)
  listarParaAnalise(
    @Headers('authorization') authorization: string | undefined,
    @Query('status') status?: string,
  ) {
    return this.ongsService.listarParaAnalise(
      this.extrairBearerToken(authorization),
      status,
    );
  }

  @Patch('admin/analises/:id/aprovar')
  @HttpCode(HttpStatus.OK)
  aprovar(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.ongsService.aprovar(this.extrairBearerToken(authorization), id);
  }

  @Patch('admin/analises/:id/reprovar')
  @HttpCode(HttpStatus.OK)
  reprovar(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AnalisarOngDto,
  ) {
    return this.ongsService.reprovar(
      this.extrairBearerToken(authorization),
      id,
      body,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  detalharPublica(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ongsService.detalharPublica(id);
  }

  private extrairBearerToken(authorization?: string): string {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token ausente.');
    }

    return authorization.slice(7);
  }
}
