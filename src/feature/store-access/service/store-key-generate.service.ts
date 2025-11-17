import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { randomUUID } from 'crypto';

@Injectable()
export class StoreKeyGenerateService {
  constructor() {}

  /**
   * 가맹점 store_key, store_secret_key 생성
   */
  async generateKey(): Promise<{ store_key: string; store_secret_key: string }> {
    const store_secret_key = uuid().replaceAll('-', '');
    const store_key = randomUUID().replace(/-/g, '').substring(0, 10);

    return { store_key: store_key, store_secret_key: store_secret_key };
  }
}