import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  public async save(id: string, profile: CreateProfileDto): Promise<User> {
    const userFound = await this.userService.findOne(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const profileCreated = this.profileRepository.create(profile);
    const profileSaved = await this.profileRepository.save(profileCreated);

    userFound.profile = profileSaved;

    return await this.userService.save(userFound);
  }
}
