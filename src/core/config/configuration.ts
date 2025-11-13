// configuration.ts
import { Configuration } from './configuration.interface';
import { ConfigFactory } from '@nestjs/config';

const configFunction: ConfigFactory<Configuration> = () => {
  return {
    isProd: process.env.NODE_ENV !== 'production',
    mysql: {
      host: process.env.MYSQL_HOST!,
      user: process.env.MYSQL_USER!,
      password: process.env.MYSQL_PASSWORD!,
      database: process.env.MYSQL_DB!,
    },
    mongodb: {
      name: process.env.MONGO_NAME!,
      url: process.env.MONGO_URL!,
    },
  };
};

export default configFunction;
