import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),

    // Monitoring
    PrometheusModule.register(),

    // Feature Modules
    AuthModule,
    UsersModule,
    RedisModule,
  ],
})
export class AppModule {}
