import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ENV_VARS_NAMES as E } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(E.POSTGRES_HOST),
        port: configService.get(E.POSTGRES_PORT),
        username: configService.get(E.POSTGRES_USER),
        password: configService.get(E.POSTGRES_PASSWORD),
        database: configService.get(E.POSTGRES_DB),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
