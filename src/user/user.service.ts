import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  // Podemos devolver la promesa como tal, asi el controlador sera
  // el que se encargue de manejar el codigo asincrono
  public saveUser(user: CreateUserDto): Promise<User> {
    const userCreated = this.userRepository.create(user);
    return this.userRepository.save(userCreated);
  }
}
