import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { PresencasController } from './presencas.controller';
import { PresencasService } from './presencas.service';

@Module({
  imports: [SupabaseModule],
  controllers: [PresencasController],
  providers: [PresencasService],
})
export class PresencasModule {}
