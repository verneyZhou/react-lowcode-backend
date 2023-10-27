import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageModule } from './page/page.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    PageModule,
    QrModule,
    // 建立mysql连接
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sql',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
