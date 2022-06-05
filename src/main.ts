import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ENV_AMQP as AMQP } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const user = configService.get(AMQP.RABBITMQ_USER);
  const password = configService.get(AMQP.RABBITMQ_PASSWORD);
  const host = configService.get(AMQP.RABBITMQ_HOST);
  const queueName = configService.get(AMQP.RABBITMQ_QUEUE_NAME);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
