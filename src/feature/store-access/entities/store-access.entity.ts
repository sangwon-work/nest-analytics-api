import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_access')
export class StoreAccess {
  @PrimaryGeneratedColumn()
  store_access_pkey: number;

  // @Column({ length: 10})
  // s_code: string;

  @CreateDateColumn()
  reg_at: Date;
}
