import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OngAprovadaGuard } from './guards/ong-aprovada.guard';
import { RolesGuard } from './guards/roles.guard';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService, OngAprovadaGuard, SupabaseAuthGuard, RolesGuard],
  exports: [AuthService, OngAprovadaGuard, SupabaseAuthGuard, RolesGuard],
})
export class AuthModule {}
