import { Injectable } from '@nestjs/common';
import { CreateStoreAccessDto } from '../dto/create-store-access.dto';
import { RegisterStoreService } from '../service/register-store.service';

@Injectable()
export class RegisterStoreFacadeService {
  constructor(private readonly registerStoreService: RegisterStoreService) {}

  async registerStoreFacade(
    createStoreAccessDto: CreateStoreAccessDto,
  ): Promise<{ store_access_pkey: number }> {
    // 가맹점 생성
    const { store_access_pkey } =
      await this.registerStoreService.registerStore(createStoreAccessDto);

    return { store_access_pkey: store_access_pkey };
  }
}
