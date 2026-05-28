import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { OportunidadesModule } from '../oportunidades/oportunidades.module';
import { InscricoesController } from './inscricoes.controller';
import { InscricoesService } from './inscricoes.service';

@Module({
  imports: [SupabaseModule, OportunidadesModule],
  controllers: [InscricoesController],
  providers: [InscricoesService],
})
export class InscricoesModule {}
