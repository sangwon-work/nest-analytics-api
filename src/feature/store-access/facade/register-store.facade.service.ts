import { Injectable } from '@nestjs/common';
import { CreateStoreAccessDto } from '../dto/create-store-access.dto';
import { RegisterStoreService } from '../service/register-store.service';
import { StoreKeyGenerateService } from '../service/store-key-generate.service';

@Injectable()
export class RegisterStoreFacadeService {
  constructor(
    private readonly storeKeyGenerateService: StoreKeyGenerateService,
    private readonly registerStoreService: RegisterStoreService,
  ) {}

  async registerStoreFacade(createStoreAccessDto: CreateStoreAccessDto): Promise<{ store_access_pkey: number }> {
    // store_key, store_secret_key 생성
    const { store_key, store_secret_key } = await this.storeKeyGenerateService.generateKey();
    createStoreAccessDto.store_key = store_key;
    createStoreAccessDto.store_secret_key = store_secret_key;

    // 가맹점 생성
    const { store_access_pkey } = await this.registerStoreService.registerStore(createStoreAccessDto);

    return { store_access_pkey: store_access_pkey };
  }
}