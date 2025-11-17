import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreAccess } from '../entities/store-access.entity';
import { Repository } from 'typeorm';
import { CreateStoreAccessDto } from '../dto/create-store-access.dto';

@Injectable()
export class RegisterStoreService {
  constructor(
    @InjectRepository(StoreAccess)
    private readonly storeAccessRepository: Repository<StoreAccess>,
  ) {}

  async registerStore(
    createStoreAccessDto: CreateStoreAccessDto,
  ): Promise<{  store_access_pkey: number }> {
    /**
     * repository.create() 란?
     * 엔티티 인스턴스를 "메모리에서" 생성하는 것
     * - 단순히 엔티티 클래스에 맞춰 새로운 객체를 만들어주는 기능
     * - DB에 저장되지는 않음
     * - TypeORM은 이 시점에 밸리데이션 or 트리거 아무 것도 동작 안함
     * ** -> create는 "객체 생성", save가 "DB insert/update"
     */
    const store_access = this.storeAccessRepository.create(createStoreAccessDto);
    const result_store_access =
      await this.storeAccessRepository.save(store_access);

    return { store_access_pkey: result_store_access.store_access_pkey };
  }
}