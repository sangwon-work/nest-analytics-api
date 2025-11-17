import { Module } from '@nestjs/common';
import { StoreAccessService } from './service/store-access.service';
import { StoreAccessController } from './store-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreAccess } from './entities/store-access.entity';
import { RegisterStoreFacadeService } from './facade/register-store.facade.service';
import { RegisterStoreService } from './service/register-store.service';
import { StoreKeyGenerateService } from './service/store-key-generate.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreAccess])],
  controllers: [StoreAccessController],
  providers: [
    RegisterStoreFacadeService,
    StoreAccessService,
    RegisterStoreService,
    StoreKeyGenerateService
  ],
})
export class StoreAccessModule {}
