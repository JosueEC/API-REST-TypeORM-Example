import { UserRole } from '../types/user-role.enum';

export class UpdateUserDto {
  username?: string;
  password?: string;
  role?: UserRole;
  authStrategy?: string;
}
