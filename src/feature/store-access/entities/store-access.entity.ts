import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { randomUUID } from 'crypto';

@Entity('store_access')
export class StoreAccess {
  @PrimaryGeneratedColumn()
  store_access_pkey: number;

  @Column({ length: 50, nullable: false, default: '' })
  store_name: string;

  @Column({
    length: 10,
    unique: true,
    nullable: false,
  })
  store_key: string;

  @Column({
    length: 36,
    unique: true,
    nullable: false,
  })
  store_secret_key: string;

  @CreateDateColumn()
  reg_at: Date;

  @BeforeInsert()
  generateKeys() {
    // 32자리 uuid (하이픈 제거)
    this.store_key = randomUUID()
      .replace(/-/g, '')
      .substring(0, 10)
      .toUpperCase();

    // 36자리 randomUUID에서 하이픈 제거 (필요하면 자르기)
    this.store_secret_key = uuid().replace(/-/g, '');
  }
}
