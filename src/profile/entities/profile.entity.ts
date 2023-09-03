import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'age', type: 'smallint', nullable: true })
  age: number;
}
