import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { makeTypeOrmOptions } from './mysql/mysql-typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => makeTypeOrmOptions(config),
    })
  ],
})
export class DatabaseModule {}