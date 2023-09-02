import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Module({
  // Aqui especificamos con que modulos, controladores y entidades
  // va a estar trabajando este servicio User. Es la misma idea, solo
  // cambia la sintaxis dependiendo del ORM y BD o libreria que se
  // este usando
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
