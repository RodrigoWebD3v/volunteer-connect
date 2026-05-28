import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { OportunidadesController } from './oportunidades.controller';
import { OportunidadesService } from './oportunidades.service';

@Module({
  imports: [SupabaseModule],
  controllers: [OportunidadesController],
  providers: [OportunidadesService],
  exports: [OportunidadesService],
})
export class OportunidadesModule {}
