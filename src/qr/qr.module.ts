/**
 * 扫码登录模块
 */
import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 注册 JwtModule
    JwtModule.register({
      secret: 'zhou',
    }),
  ],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
