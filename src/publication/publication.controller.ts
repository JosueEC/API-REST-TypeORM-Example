import { Controller, Get, Post, Body } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from './entities/publication.entity';

@Controller('/v1/publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  public async createPublication(
    @Body() publication: CreatePublicationDto,
  ): Promise<Publication> {
    return this.publicationService.create(publication);
  }

  @Get()
  public async findPublications(): Promise<Publication> {
    return this.publicationService.findAll();
  }
}
