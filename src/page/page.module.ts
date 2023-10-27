/**
 * 低代码平台CRUD模块
 */

import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';

// 这一层是使用@Module() 装饰器的类，它提供了元数据，Nest 用它来组织应用程序结构。
// 我们有了控制层和服务层后，它们还无法运行，因为它们缺少一个组织。
@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
