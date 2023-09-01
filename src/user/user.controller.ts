import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async postUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.saveUser(user);
  }

  @Get()
  public async getUser(): Promise<User[]> {
    return await this.userService.findUser();
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteOneUser(id);
  }
}
