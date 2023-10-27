import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// 入口
// 导入AppModule，使用NestFactory来创建实例
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('statics', { prefix: '/fe' }); // 生成静态目录，前缀是 /fe，例：http://localhost:3001/fe/confirm.html => statics/confirm.html
  app.enableCors(); // 配置cors
  await app.listen(3001); // 配置访问端口
}
bootstrap();
