import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
