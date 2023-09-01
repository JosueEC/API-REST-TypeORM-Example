import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  ConflictException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Podemos devolver la promesa como tal, asi el controlador sera
  // el que se encargue de manejar el codigo asincrono
  public async saveUser(user: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findBy({
      username: user.username,
    });

    if (userExists) {
      throw new ConflictException(`The email ${user.username} already in use`);
    }

    const userCreated = this.userRepository.create(user);
    return this.userRepository.save(userCreated);
  }

  public async findUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOneUser(id: string): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return userExists;
  }

  public async deleteOneUser(id: string): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
    return userExists;
    // Delete no devuelve el elemento eliminado, devuelve las
    // filas que han sido afectadas por la eliminacion como un
    // dato de tipo DeleteResult
  }

  public async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, user);

    return await this.userRepository.findOneBy({ id });
  }
}
