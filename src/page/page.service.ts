import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Repository } from 'typeorm';

// 服务层用于处理具体的业务逻辑，当我们收到客户端的请求后，取出参数编写具体的业务代码。
@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}

  // 创建数据
  create(createPageDto: CreatePageDto) {
    return this.pageRepository.save(createPageDto);
  }

  // 获取所有数据
  findAll() {
    return `This action returns all page`;
  }

  // 获取单条数据
  findOne(id: number) {
    return this.pageRepository.findOneBy({ id });
  }

  // 更新数据
  update(updatePageDto: UpdatePageDto) {
    return this.pageRepository.update({ id: updatePageDto.id }, updatePageDto);
  }

  // 删除数据
  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
