import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Delete,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common'; // nest提供的装饰器
import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';
import { UpdateQrDto } from './dto/update-qr.dto';

import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

// 定义二维码信息
interface QrCodeInfo {
  // 二维码状态：noscan => 未扫描，scan-wait-confirm => 已扫描，等待确认，scan-confirm => 已确认，scan-cancel => 已取消，expired => 已过期
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}

// 用于存储二维码信息， map => key 是二维码 id，value 是二维码信息
const map = new Map<string, QrCodeInfo>();

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  // 注入 JwtService
  @Inject(JwtService)
  private JwtService: JwtService;

  // 用户信息
  private users = [
    {
      id: 1,
      username: '111',
      password: '111',
    },
    {
      id: 2,
      username: '222',
      password: '222',
    },
  ];

  // 生成一个随机的二维码 id，存到 redis 里，并返回二维码
  // http://localhost:3001/qr/generate GET
  @Get('generate')
  async generate() {
    const uuid = randomUUID(); // 生成一个随机的二维码 id
    const url = `http://localhost:3001/fe/confirm.html?id=${uuid}`;
    const dataUrl = await qrcode.toDataURL(url); // 生成二维码图片 base64

    map.set(`qrcode_${uuid}`, {
      status: 'noscan',
    });

    return {
      qrcode_id: uuid,
      img: dataUrl,
      url,
    };
  }

  // 检查二维码状态
  @Get('check')
  // @Query 用于获取请求url中的数据
  async check(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`); // 取出二维码信息
    return info;
  }

  // 扫描二维码接口
  @Get('scan')
  async scan(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    info.status = 'scan-wait-confirm'; // 修改二维码状态: scan-wait-confirm => 已扫描，等待确认
    return 'success';
  }

  // 取消接口
  @Get('cancel')
  async cancel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    info.status = 'scan-cancel'; // 修改二维码状态: scan-cancel => 已取消
    return 'success';
  }

  // 确认接口
  @Get('confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    let user;
    try {
      const [, token] = auth.split(' '); // 取出 token
      const info = await this.JwtService.verify(token); // 验证 token
      user = this.users.find((i) => i.id == info.userId); // 根据 userId 找到用户信息
    } catch (e) {
      throw new UnauthorizedException('token 无效ƒ');
    }

    const info = map.get(`qrcode_${id}`);
    info.status = 'scan-confirm';
    info.userInfo = user;
    return 'success';
  }

  // 登录接口
  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find(
      (i) => i.username === username && i.password === password,
    ); // 根据用户名找到用户信息

    if (!user) {
      return {
        code: 1,
        msg: '用户名或密码错误',
      };
    }

    // 返回用户 jwt token
    return {
      token: await this.JwtService.sign({
        // 生成 token
        userId: user.id,
      }),
    };
  }

  // // 用于处理post格式的请求，它也接受一个参数，此处我写了add，代表/qr/add的post请求会进到这里。
  // @Post('add')
  // // 用于获取http body中的数据
  // create(@Body() createQrDto: CreateQrDto) {
  //   return this.qrService.create(createQrDto);
  // }

  // @Get()
  // findAll() {
  //   return this.qrService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.qrService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQrDto: UpdateQrDto) {
  //   return this.qrService.update(+id, updateQrDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.qrService.remove(+id);
  // }
}
