import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  public async postUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.saveUser(user);
  }

  @Get()
  public async getUser(): Promise<User[]> {
    return await this.userService.findUser();
  }
}
