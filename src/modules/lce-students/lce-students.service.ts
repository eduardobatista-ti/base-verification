import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as XLSX from 'xlsx';
import { LceStudents } from './lce-students.entity';
import { DocumentProcessor } from 'src/shared/document-processor';

interface StudentRow {
  'E-mail'?: string;
  CPF?: string;
}

@Injectable()
export class LceStudentsService {
  constructor(
    @InjectRepository(LceStudents)
    private readonly lceStudentsRepository: Repository<LceStudents>,
    private readonly documentProcessor: DocumentProcessor,
  ) {}
  async verifyDocumentExists(
    document: string,
  ): Promise<{ exists: boolean, documentType: string } | undefined> {
    const documentProcessed = this.documentProcessor.processDocument(document);

    if (documentProcessed.type === 'invalid') {
      throw new BadRequestException('Invalid document');
    }

    if (documentProcessed.type === 'cpf' || documentProcessed.type === 'cnpj') {
      const documentFound = await this.lceStudentsRepository.findOne({
        where: { cpf: documentProcessed.value },
      });

      if (documentFound) {
        return { exists: true, documentType: documentProcessed.type };
      }
    }

    if (documentProcessed.type === 'email') {
      const documentFound = await this.lceStudentsRepository.findOne({
        where: { email: documentProcessed.value },
      });

      if (documentFound) {
        return { exists: true, documentType: documentProcessed.type };
      }
    }
    throw new NotFoundException('Document not found');
  }

  async importLceStudentsFromXlsx(
    file: Express.Multer.File,
  ): Promise<{ success: number; skipped: number }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(worksheet) as StudentRow[];

      if (data.length === 0) {
        throw new BadRequestException('The uploaded file is empty');
      }

      const studentsToInsert: any[] = [];
      let skipped = 0;

      for (const row of data) {
        const email = row['E-mail']?.toString().trim() || '';
        const cpf = row.CPF?.toString().trim() || '';

        if (email === '' && cpf === '') {
          skipped++;
          continue;
        }

        const studentData: any = {};
        if (email !== '') studentData.email = email;
        if (cpf !== '') studentData.cpf = cpf;

        studentsToInsert.push(studentData);
      }

      if (studentsToInsert.length > 0) {
        await this.lceStudentsRepository.insert(studentsToInsert);
      }

      return {
        success: studentsToInsert.length,
        skipped,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Erro ao processar o arquivo: ${error.message}`,
      );
    }
  }
}
