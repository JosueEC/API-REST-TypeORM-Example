import { Module } from '@nestjs/common';
import { OccupationController } from './occupation.controller';
import { OccupationService } from './occupations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './entities/occupation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Occupation])],
  controllers: [OccupationController],
  providers: [OccupationService],
  exports: [],
})
export class OccupationModule {}
