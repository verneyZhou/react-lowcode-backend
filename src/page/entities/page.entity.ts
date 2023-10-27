import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  timestamp: string;
  // 1 编辑中  2 已发布  3 已下线
  @Column()
  state: number;
  // JSON.stringify(schemaJSON)
  @Column()
  schema: string;
}
