import { Injectable } from '@nestjs/common';
import { GetStoreAccessListDto } from '../dto/get-store-access-list.dto';
import { GetStoreAccessListService } from '../service/get-store-access-list.service';

@Injectable()
export class GetStoreAccessListFacadeService {
  constructor(
    private readonly getStoreAccessListService: GetStoreAccessListService,
  ) {}

  async getStoreAccessListFacade(getStoreAccessListDto: GetStoreAccessListDto) {
    return await this.getStoreAccessListService.getList(getStoreAccessListDto);
  }
}
