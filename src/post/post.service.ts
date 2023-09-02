import { Injectable, NotFoundException } from '@nestjs/common';
import { SavePostDto } from './dto/save-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  public async savePost(post: SavePostDto): Promise<Post> {
    // Primero verificamos que el usuario al que se quiere asociar
    // el post exista
    const userFound = await this.userService.findOneUser(post.authorId);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    // En el caso de que si existe, entonces podemos crear el post
    // con los datos recibidos y guardarlo en la BD asi como retornar
    // la respuesta
    const postCreated = this.postRepository.create(post);
    return await this.postRepository.save(postCreated);
  }

  public async findPost(): Promise<Post[]> {
    return await this.postRepository.find();
  }
}
