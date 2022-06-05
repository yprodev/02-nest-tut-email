import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Subscriber } from './subscribers/subscriber.entity';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SubscribersController } from './subscribers/subscribers.controller';
import { SubscribersService } from './subscribers/subscribers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriber]),
    DatabaseModule,
    SubscribersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        RABBITMQ_USER: Joi.string(),
        RABBITMQ_PASSWORD: Joi.string(),
        RABBITMQ_HOST: Joi.string(),
        RABBITMQ_QUEUE_NAME: Joi.string(),
      }),
    }),
  ],
  controllers: [SubscribersController],
  providers: [AppService, SubscribersService],
})
export class AppModule {}
