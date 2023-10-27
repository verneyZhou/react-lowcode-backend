import { Injectable } from '@nestjs/common';

// 声明模块里可以注入的 provider
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello ! Welcome to use react-lowcode-backend!';
  }
}
