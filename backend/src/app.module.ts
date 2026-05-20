import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { OngsModule } from './ongs/ongs.module';

@Module({
  imports: [SupabaseModule, AuthModule, OngsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
