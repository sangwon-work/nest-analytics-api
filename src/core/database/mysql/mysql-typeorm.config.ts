// core/database/typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { Configuration } from '../../config/configuration.interface';

export const makeTypeOrmOptions = (config: ConfigService): DataSourceOptions => {
  const isProd = config.get<boolean>('isProd');
  const mysql = config.get<Configuration['mysql']>('mysql');
  return {
    type: 'mysql',
    host: mysql?.host,
    port: 3306,
    username: mysql?.user,
    password: mysql?.password,
    database: mysql?.database,

    // 엔티티는 feature 모듈에 두고 glob으로 읽어오거나,
    // autoLoadEntities: true 사용할 수 있어요(아래 참고)
    entities: [__dirname + '/../../**/*.entity.{ts,js}'],

    // 운영에서는 false 권장
    synchronize: !isProd,
    // 서버 부팅 시 마이그레이션 자동 적용(원하면)
    migrationsRun: isProd,

    // 마이그레이션 경로
    migrations: [__dirname + '/../../**/migrations/*.{ts,js}'],

    // 편의 옵션
    // namingStrategy: new SnakeNamingStrategy(),
    logging: !isProd ? ['error', 'schema', 'warn'] : ['error'],
    timezone: 'Z', // RDS UTC 권장, 앱에서 KST로 변환
  };
};
