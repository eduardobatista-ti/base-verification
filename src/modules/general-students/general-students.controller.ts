import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeneralStudentsService } from './general-students.service';

@Controller('general-students')
export class GeneralStudentsController {
  constructor(
    private readonly generalStudentsService: GeneralStudentsService,
  ) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importLceStudents(@UploadedFile() file: Express.Multer.File) {
    const result =
      await this.generalStudentsService.importLceStudentsFromXlsx(file);
    return {
      message: 'Importação concluída',
      ...result,
    };
  }
}
