import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './types/user-role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ enum: UserRole })
  role: UserRole

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
