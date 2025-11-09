import { Module } from '@nestjs/common';
import { LceStudentsService } from './lce-students.service';
import { LceStudentsController } from './lce-students.controller';
import { LceStudents } from './lce-students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LceStudents])],
  controllers: [LceStudentsController],
  providers: [LceStudentsService],
})
export class LceStudentsModule {}
