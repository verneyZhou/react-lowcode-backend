import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';

// export class UpdatePageDto extends PartialType(CreatePageDto) {}

// 更新数据
export class UpdatePageDto {
  id: number;
  usename: string;
  schema: string;
  state: number;
  timestamp: string;
}
