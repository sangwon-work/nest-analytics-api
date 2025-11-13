// src/core/database/mysql/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration'; // 👈 네가 만든 configuration.ts
import { makeTypeOrmOptions } from './mysql-typeorm.config';
import * as dotenv from 'dotenv';
import * as path from 'path';

const node_env = process.env.NODE_ENV || 'development';
const env_file_name = `.env.${node_env}`;

// ✅ dist/core/database/mysql → ../../../.. → 프로젝트 루트
const env_file_path = path.resolve(__dirname, '../../../../dist/core/config/env/', env_file_name);

console.log('[data-source.ts] NODE_ENV:', process.env.NODE_ENV);
console.log('[data-source.ts] envFilePath:', env_file_path);

// .env 로드 (NODE_ENV에 맞게 .env 설정해 놨다면 여기서 읽힘)
// ✅ 여기서 직접 로드
dotenv.config({ path: env_file_path });

// configuration()은 ConfigFactory라서 실제 설정 객체를 반환함
const configObject = configuration();

// Nest 없이 ConfigService를 "흉내" 내는 부분
const configService = new ConfigService(configObject);

// makeTypeOrmOptions 를 그대로 재사용
const dataSource = new DataSource(makeTypeOrmOptions(configService));

// TypeORM CLI가 기본으로 찾을 수 있게 default export
export default dataSource;
