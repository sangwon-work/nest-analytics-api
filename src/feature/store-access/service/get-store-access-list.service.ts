import { Injectable } from '@nestjs/common';
import { GetStoreAccessListDto } from '../dto/get-store-access-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreAccess } from '../entities/store-access.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { setItemsNumber } from '../../../shared/pagination/set-items-number';

@Injectable()
export class GetStoreAccessListService {
  constructor(
    @InjectRepository(StoreAccess)
    private readonly storeAccessRepository: Repository<StoreAccess>,
  ) {}

  async getList(getStoreAccessListDto: GetStoreAccessListDto) {
    const { page, limit } = getStoreAccessListDto;

    const options: FindManyOptions<StoreAccess> = {
      select: ['store_access_pkey', 'store_name', 'store_key'],
      skip: (page - 1) * limit,
      take: limit,
      order: { store_access_pkey: 'DESC' },
    };

    if (getStoreAccessListDto.store_name !== '') {
      options.where = {
        store_name: Like(`%${getStoreAccessListDto.store_name}%`),
      };
    }

    const [items, total] =
      await this.storeAccessRepository.findAndCount(options);

    const totalPages = Math.ceil(total / limit);

    // 게시물 번호 붙이기
    const numberedItems = setItemsNumber<StoreAccess>(items, page, limit);

    return {
      meta: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      numberedItems,
    };
  }
}
