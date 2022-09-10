import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Cron } from '@nestjs/schedule';

@WebSocketGateway(5500, {
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @Cron('0 */3 * * * *', {
    name: 'add-task',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
