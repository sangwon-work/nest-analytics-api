# 🏗️ Project Architecture Overview

## ⚙️ Environment Setup
- **Node.js**: `v22.20.0`
- **Version Manager**: `nvm`  
  → 개발 환경 통일을 위해 Node 버전은 `nvm use 22.20.0` 으로 관리합니다.
- **Environment Variables**
    - 환경 변수는 `.env` 파일로 관리합니다.
    - NestJS의 `@nestjs/config` 모듈을 통해 전역적으로 로드되며,  
      `.env.local`, `.env.dev`, `.env.prod` 등 환경별로 분리됩니다.
    - 서비스 내에서는 `ConfigService`를 통해 주입받아 사용합니다.

---

## 🧩 Architecture Pattern
- 본 프로젝트는 **헥사고날 아키텍처(Hexagonal Architecture)** 를 기반으로 설계되었습니다.
- 구조:
  domain/
  ├─ service, model, rule
  port/
  ├─ reader.port.ts, writer.port.ts
  adapter/
  ├─ mysql.adapter.ts, redis.adapter.ts
- NestJS 기반으로 개발되었으며, 인증, 응답 처리, 로깅, 예외 처리 등 주요 라이프사이클을 체계적으로 구성하였습니다.

---

## 🧩 프로젝트 구조 요약

| 구성 요소 | 설명                                              |
|------------|-------------------------------------------------|
| **Framework** | [NestJS](https://nestjs.com/)                   |
| **Database** | MySQL (mysql2/promise), MongoDB                 |
| **Language** | TypeScript                                      |
| **Architecture** | Layered (Controller → Facade → Service → Model) |
| **Execution Environment** | Node.js 22+, Docker (개발/운영 동일 환경)               |

---

## ⚙️ 라이프사이클 개요

요청 → **Guard (JWT 인증)** → **Interceptor 1 (요청/응답 로깅)** → **Controller** → **Service** → **Interceptor 1 (요청/응답 로깅)** → **Interceptor 2 (응답 변환)** → 응답  
예외 발생 시 → **Exception Filter (Global)** 처리


---

## 🛡️ Guard

### `JwtAuthGuard`
- 모든 보호된 API에 적용되는 인증 가드입니다.
- `Authorization` 헤더에서 JWT를 파싱 및 검증합니다.
- 인증 실패 시 `UnauthorizedException` 발생 → Exception Filter에서 처리됩니다.

**경로 예시:** src/core/guard/jwt-access.guard.ts


---

## 🔍 Interceptors

### 1. `ResponseTransformInterceptor`
- 모든 API 응답을 **일관된 포맷으로 변환**합니다.
- 컨트롤러의 반환 값을 `{ rescode, message, body }` 구조로 래핑합니다.
- 성공 응답 기본값:
  ```json
  { "rescode": "0000", "message": "success", "body": {} }
  ```
**경로 예시:** src/core/interceptor/transform.interceptor.ts

### 2. `LogInterceptor`
- 요청 및 응답 로그를 DB에 저장
- API 호출 시간, URL, HTTP 메서드, 요청자, 요청/응답 등을 기록
- 비즈니스 로직과 분리되어 비동기 처리 및 트랜잭션 독립성을 유지합니다.

**경로 예시:** src/core/http/cms-log.interceptor.ts

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
