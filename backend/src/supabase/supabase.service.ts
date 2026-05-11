import { Injectable } from '@nestjs/common';
import type { WebSocketLikeConstructor } from '@supabase/realtime-js';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const websocketTransport = WebSocket as unknown as WebSocketLikeConstructor;

@Injectable()
export class SupabaseService {
  private readonly url = this.getRequiredEnv('SUPABASE_URL');
  private readonly anonKey = this.getRequiredEnv('SUPABASE_ANON_KEY');
  private readonly serviceRoleKey = this.getRequiredEnv(
    'SUPABASE_SERVICE_ROLE_KEY',
  );
  private readonly logosBucket =
    process.env.SUPABASE_LOGOS_BUCKET ?? 'logos-ongs';

  readonly publicClient = createClient(this.url, this.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: websocketTransport,
    },
  });

  readonly adminClient = createClient(this.url, this.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: websocketTransport,
    },
  });

  getLogosBucket(): string {
    return this.logosBucket;
  }

  private getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
      throw new Error(`Variavel de ambiente obrigatoria ausente: ${name}`);
    }

    return value;
  }
}
