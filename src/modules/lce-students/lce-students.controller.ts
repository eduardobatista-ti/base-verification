import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LceStudentsService } from './lce-students.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lce-students')
export class LceStudentsController {
  constructor(private readonly lceStudentsService: LceStudentsService) {}

  @Get('verify')
  async verifyDocument(@Query('document') document: string) {
    return await this.lceStudentsService.verifyDocumentExists(document);
  }

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
