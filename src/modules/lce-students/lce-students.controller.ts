import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LceStudentsService } from './lce-students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SecretGuard } from 'src/security/secret.guard';

@UseGuards(SecretGuard)
@Controller('lce-students')
export class LceStudentsController {
  constructor(private readonly lceStudentsService: LceStudentsService) {}

  @Get('verify/:document')
  async verifyDocument(@Param('document') document: string) {
    return await this.lceStudentsService.verifyDocumentExists(document);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importLceStudents(@UploadedFile() file: Express.Multer.File) {
    const enabled = process.env.CSV_IMPORT_ENABLED === 'true';
    if (!enabled) {
      return { message: 'File import not allowed' };
    }

    const result =
      await this.lceStudentsService.importLceStudentsFromXlsx(file);
    return {
      message: 'import completed',
      ...result,
    };
  }
}
