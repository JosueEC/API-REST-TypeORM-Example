import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { Occupation } from './entities/occupation.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class OccupationService {
  // Tenemos 3 formas de interactuar con la base de datos atraves de
  // TypeORM, puede ser a traves de:
  //* Repository API
  //* EntityManager API
  //* DataSource API
  constructor(
    @InjectRepository(Occupation)
    private readonly occupationRepository: Repository<Occupation>,
    @InjectEntityManager() private occupationManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  public async findOne(id: string) {
    // Consulta usando la API de repository
    const resultWithRepository = await this.occupationRepository.findOneBy({
      id,
    });

    // Consulta usando la funcion createQueryBuilder de la API de
    // repository
    const resultWithRepositoryQueryBuilder = await this.occupationRepository
      .createQueryBuilder('occupation')
      .where('occupation.id= :occupationId', { occupationId: id })
      .getOne();

    // Consulta usando la API de EntityManager
    const resultWithEntityManager = await this.occupationManager
      .createQueryBuilder(Occupation, 'occupation')
      .where('occupation.id= :occupationId', { occupationId: id })
      .getOne();

    // Consulta usando la API de DataSource
    const resultWithDataSource = await this.dataSource
      .createQueryBuilder()
      .select('post')
      .from(Occupation, 'occupation')
      .where('occupation.id= :occupationId', { occupationId: id })
      .getOne();

    // Al parecer la diferencia de usar una u otra es la complejidaa
    // de la consulta el tamaño del conjunto de datos que seran
    // devueltos, donde QueryBuilder sera mas eficiente cuando la
    // consulta implica la union de varias tablas y devuelve bastantes
    // datos

    // Ejemplo de un consulta LEFT JOIN usando la API de Repository
    //* userRepository.find({
    //*   relations: ['course'],
    //*   where: {
    //*     course: {
    //*       name: 'Javascript Fundamentals',
    //*       length: '8 hours',
    //*     },
    //*   },
    //* });

    // Ejemplo de la misma consulta LEFT JOIN usando QueryBuilder
    //* const user = this.userManager
    //*   .createQueryBuilder(User, 'user')
    //*   .leftjoin('course.id', 'course')
    //*   .where('course.name = :name', { name: 'Javascript Fundamentals' })
    //*   .andWhere('course.length= :length', { length: '8 hourse' });

    return {
      resultWithRepository,
      resultWithRepositoryQueryBuilder,
      resultWithEntityManager,
      resultWithDataSource,
    };
  }
}
