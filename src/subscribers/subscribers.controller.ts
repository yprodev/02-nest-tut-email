import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateSubscriberDto } from './dto/createSubscriber.dto';

import { SubscribersService } from './subscribers.service';
import { COMMANDS as CMD } from './subscribers.constants';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @EventPattern({ cmd: CMD.ADD_SUBSCRIBER })
  addSubscriber(@Payload() subscriber: CreateSubscriberDto) {
    return this.subscribersService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CMD.GET_ALL_SUBSCRIBERS })
  getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }
}
