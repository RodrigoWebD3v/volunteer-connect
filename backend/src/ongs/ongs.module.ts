import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { OngsController } from './ongs.controller';
import { OngsService } from './ongs.service';

@Module({
  imports: [SupabaseModule],
  controllers: [OngsController],
  providers: [OngsService],
})
export class OngsModule {}
