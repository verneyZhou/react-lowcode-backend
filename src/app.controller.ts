import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';



// 定义接口, 如：http://localhost:3001/ GET
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
