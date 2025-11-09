import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as XLSX from 'xlsx';
import { LceStudents } from './lce-students.entity';

interface StudentRow {
  'E-mail'?: string;
  CPF?: string;
}

@Injectable()
export class LceStudentsService {
  constructor(
    @InjectRepository(LceStudents)
    private readonly lceStudentsRepository: Repository<LceStudents>,
  ) {}

  async importLceStudentsFromXlsx(
    file: Express.Multer.File,
  ): Promise<{ success: number; skipped: number }> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(worksheet) as StudentRow[];

      if (data.length === 0) {
        throw new BadRequestException('O arquivo está vazio');
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
