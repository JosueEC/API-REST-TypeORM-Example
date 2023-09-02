import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from './entities/publication.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
    private readonly userService: UserService,
  ) {}

  public async create(publication: CreatePublicationDto): Promise<Publication> {
    // Primero verificamos que el usuario al que se quiere asociar
    // el post exista
    const userFound = await this.userService.findOneUser(publication.authorId);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    // En el caso de que si existe, entonces podemos crear el post
    // con los datos recibidos y guardarlo en la BD asi como retornar
    // la respuesta
    const publicationCreated = this.publicationRepository.create(publication);
    return this.publicationRepository.save(publicationCreated);
  }

  public async findAll(): Promise<Publication[]> {
    return this.publicationRepository.find({
      relations: ['author'],
    });
  }
}
