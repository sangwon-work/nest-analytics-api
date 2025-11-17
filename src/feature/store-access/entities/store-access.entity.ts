import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_access')
export class StoreAccess {
  @PrimaryGeneratedColumn()
  store_access_pkey: number;

  @Column({ length: 50 })
  store_name: string;

  @Column({ length: 10, unique: true})
  store_key: string;

  @Column({ length: 36, unique: true })
  store_secret_key: string;

  @CreateDateColumn()
  reg_at: Date;
}
