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
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  // @Param(':id', ParseIntPipe) --> para parsear datos
  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

  @Post('/profile/:id')
  public async postProfile(
    @Param(':id') id: string,
    @Body() profile: CreateProfileDto,
  ): Promise<User> {
    return await this.userService.saveProfile(id, profile);
  }
}
