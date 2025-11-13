export interface Configuration {
  isProd: boolean;
  mysql: {
    host: string;
    user: string;
    password: string;
    database: string;
  },
  mongodb: {
    name: string;
    url: string;
  },
}