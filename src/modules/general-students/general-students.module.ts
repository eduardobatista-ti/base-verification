import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralStudents } from './general-students.entity';
import { GeneralStudentsService } from './general-students.service';
import { GeneralStudentsController } from './general-students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralStudents])],
  controllers: [GeneralStudentsController],
  providers: [GeneralStudentsService],
  exports: [],
})
export class GeneralStudentsModule {}
