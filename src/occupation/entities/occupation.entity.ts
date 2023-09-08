import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('occupation')
export class Occupation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name ', type: 'varchar' })
  name: string;
}
