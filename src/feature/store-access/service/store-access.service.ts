import { Injectable } from '@nestjs/common';
import { CreateStoreAccessDto } from '../dto/create-store-access.dto';
import { UpdateStoreAccessDto } from '../dto/update-store-access.dto';

@Injectable()
export class StoreAccessService {
  create(createStoreAccessDto: CreateStoreAccessDto) {
    return 'This action adds a new storeAccess';
  }

  findAll() {
    return `This action returns all storeAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeAccess`;
  }

  update(updateStoreAccessDto: UpdateStoreAccessDto) {
    return `This action updates a # storeAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeAccess`;
  }
}
