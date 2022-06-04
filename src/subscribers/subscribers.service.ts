import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubscriberDto } from './dto/createSubscriber.dto';
import { Subscriber } from './subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const newSubscriber = await this.subscriberRepository.create(subscriber);
    await this.subscriberRepository.save(newSubscriber);

    return newSubscriber;
  }

  async getAllSubscribers() {
    return this.subscriberRepository.find();
  }
}
