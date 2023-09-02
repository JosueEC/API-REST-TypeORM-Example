import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  ConflictException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Podemos devolver la promesa como tal, asi el controlador sera
  // el que se encargue de manejar el codigo asincrono
  public async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (userExists) {
      throw new ConflictException(`The email ${user.username} already in use`);
    }

    const userCreated = this.userRepository.create(user);
    return this.userRepository.save(userCreated);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['publications'],
    });
  }

  public async findOne(id: string): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['publications', 'profile'],
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return userExists;
  }

  public async delete(id: string): Promise<User> {
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

  public async update(id: string, user: UpdateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, user);

    return await this.userRepository.findOneBy({ id });
  }

  public async saveProfile(
    id: string,
    profile: CreateProfileDto,
  ): Promise<User> {
    // Se verifica si el usuario existe
    const userExists = await this.userRepository.findOneBy({ id });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Primero se crea la instancia del profile con los datos que llegan
    // por parametros
    // Despues se guarda esta instancia en la BD
    const profileCreated = await this.profileRepository.create(profile);
    const profileSaved = await this.profileRepository.save(profileCreated);

    // A continuacion se relaciona el profile guardado con la propiedad
    // profile de la entidad user que encontramos. Hasta aqui solo se ha
    // relacionado de forma local
    userExists.profile = profileSaved;
    // Finalmente retornamos la respuesta de guardar el usuario con la
    // informacion del profile relacionada
    return this.userRepository.save(userExists);
  }
}
