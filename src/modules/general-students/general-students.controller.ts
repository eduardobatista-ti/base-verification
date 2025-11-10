import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeneralStudentsService } from './general-students.service';
import { SecretGuard } from 'src/security/secret.guard';

@UseGuards(SecretGuard)
@Controller('general-students')
export class GeneralStudentsController {
  constructor(
    private readonly generalStudentsService: GeneralStudentsService,
  ) {}

  @Get('verify/:document')
  async verifyDocument(@Param('document') document: string) {
    return await this.generalStudentsService.verifyDocumentExists(document);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importLceStudents(@UploadedFile() file: Express.Multer.File) {
    const enabled = process.env.CSV_IMPORT_ENABLED === 'true';
    if (!enabled) {
      return { message: 'File import not allowed' };
    }
    const result =
      await this.generalStudentsService.importLceStudentsFromXlsx(file);
    return {
      message: 'Importação concluída',
      ...result,
    };
  }
}
