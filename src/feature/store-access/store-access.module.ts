import { Module } from '@nestjs/common';
import { StoreAccessService } from './service/store-access.service';
import { StoreAccessController } from './store-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreAccess } from './entities/store-access.entity';
import { RegisterStoreFacadeService } from './facade/register-store.facade.service';
import { RegisterStoreService } from './service/register-store.service';
import { GetStoreAccessListFacadeService } from './facade/get-store-access-list-facade.service';
import { GetStoreAccessListService } from './service/get-store-access-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreAccess])],
  controllers: [StoreAccessController],
  providers: [
    RegisterStoreFacadeService,
    StoreAccessService,
    RegisterStoreService,
    GetStoreAccessListFacadeService,
    GetStoreAccessListService,
  ],
})
export class StoreAccessModule {}
