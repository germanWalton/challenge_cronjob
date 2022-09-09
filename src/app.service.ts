import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Cron('0 */3 * * * *')
  showEveyThreeMinutes() {
    this.logger.debug('This message will appear every 3 minutes');
  }
  getHello() {
    return 'Hello';
  }
}
