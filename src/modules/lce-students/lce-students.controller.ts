import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LceStudentsService } from './lce-students.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lce-students')
export class LceStudentsController {
  constructor(private readonly lceStudentsService: LceStudentsService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importLceStudents(@UploadedFile() file: Express.Multer.File) {
    const result =
      await this.lceStudentsService.importLceStudentsFromXlsx(file);
    return {
      message: 'Importação concluída',
      ...result,
    };
  }
}
