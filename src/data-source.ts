import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'wedding',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: true,
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );

export { AppDataSource };
