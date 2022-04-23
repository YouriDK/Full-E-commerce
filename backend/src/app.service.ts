import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStart(): string {
    return 'Server is launched & Mongoose is connected 😍 !';
  }
}
