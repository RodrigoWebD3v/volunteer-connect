import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { OngsModule } from './ongs/ongs.module';
import { OportunidadesModule } from './oportunidades/oportunidades.module';
import { InscricoesModule } from './inscricoes/inscricoes.module';
import { PresencasModule } from './presencas/presencas.module';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    OngsModule,
    OportunidadesModule,
    InscricoesModule,
    PresencasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
