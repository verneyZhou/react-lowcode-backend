import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

// 定义 page 模块下的接口：
// 用于标识此文件是一个控制器，它接受一个参数，此处我写了home，代表所有/page的请求都会进到这里
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  // 定义接口, 如：http://localhost:3001/page POST
  // 创建模板
  @Post()
  // @Body() 用于获取http body中的数据
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  // 编辑模板
  @Post(':id')
  update(@Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(updatePageDto);
  }

  // 获取所有模板
  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  // 获取模板详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
  //   return this.pageService.update(+id, updatePageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pageService.remove(+id);
  // }
}
