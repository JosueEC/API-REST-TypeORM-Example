import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../types/user-role.enum';
import { Profile } from './profile.entity';
import { Publication } from 'src/publication/entities/publication.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ enum: UserRole })
  role: UserRole;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ nullable: true, default: 'NONE' })
  authStrategy: string;

  // Esta es la forma en la que se establece una relacion 1:1 en
  // typeORM. en este caso la relacion s establece en la clase
  // user, por lo que la columna con el idProfile sera creada en
  // la entidad de esta clase.
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  // Esta es una de las partes para establecer una relacion 1:n
  // aqui establecemos que un usuario esta relacionado a muchos
  // posts.
  // Se debe establecer con que columna de la tabla relacionada es
  // con la que se establece la relacion, en este caso es la columna
  // author, que es donde se creo la relacion en la entidad Post
  @OneToMany(() => Publication, (publication) => publication.author)
  posts: Publication[];
}
