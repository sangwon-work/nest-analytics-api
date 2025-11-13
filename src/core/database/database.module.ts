import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { makeTypeOrmOptions } from './mysql/mysql-typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...makeTypeOrmOptions(config), // host/port/username/... 리턴하는 기존 함수
        keepConnectionAlive: true,     // ← 여기에 넣어야 함 (리턴 객체)
      }),
    }),
  ]
})
export class DatabaseModule {}