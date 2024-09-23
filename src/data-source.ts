import { DataSource } from 'typeorm';
import * as config from 'config';

const mysqlData = config.get('mysql');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: mysqlData.username,
  password: mysqlData.password,
  database: mysqlData.database,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: true,
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );

export { AppDataSource };
