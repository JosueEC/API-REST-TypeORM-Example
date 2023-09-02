import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../types/user-role.enum';
import { Profile } from './profile.entity';

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

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  // Esta es la forma en la que se establece una relacion 1:1 en
  // typeORM. en este caso la relacion s establece en la clase
  // user, por lo que la columna con el idProfile sera creada en
  // la entidad de esta clase.
}
