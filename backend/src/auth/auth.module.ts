import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OngAprovadaGuard } from './guards/ong-aprovada.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService, OngAprovadaGuard],
  exports: [AuthService, OngAprovadaGuard],
})
export class AuthModule {}
