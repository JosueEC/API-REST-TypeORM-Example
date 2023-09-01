import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  // Podemos devolver la promesa como tal, asi el controlador sera
  // el que se encargue de manejar el codigo asincrono
  public saveUser(user: CreateUserDto): Promise<User> {
    const userCreated = this.userRepository.create(user);
    return this.userRepository.save(userCreated);
  }

  public findUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findOneUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async deleteOneUser(id: string): Promise<User> {
    const check = await this.userRepository.findOneBy({ id });

    if (!check) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    await this.userRepository.delete(id);
    return check;
    // Delete no devuelve el elemento eliminado, devuelve las
    // filas que han sido afectadas por la eliminacion como un
    // dato de tipo DeleteResult
  }
}
