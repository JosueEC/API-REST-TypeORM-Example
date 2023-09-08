import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationModule } from './publication/publication.module';
import { OccupationModule } from './occupation/occupation.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'users_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // En esta parte nos
  // pide agregar todas las clases que van a ser consideras como
  // entidades, esta es una forma de establecer que tome como
  // entidades a cualquier archivo con la extension que le indiquemos
  //* [User, Publication, Occupation]
  synchronize: true, // Esto va false en produccion
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    PublicationModule,
    OccupationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
