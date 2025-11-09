import { Injectable } from '@nestjs/common';

export interface DocumentProcessingResult {
  type: 'cpf' | 'cnpj' | 'email' | 'invalid';
  value: string;
}

@Injectable()
export class DocumentProcessor {
  processDocument(document: string): DocumentProcessingResult {
    if (!document || typeof document !== 'string') {
      return { type: 'invalid', value: document };
    }

    const cleaned = document.trim();

    const cpfResult = this.processCPF(cleaned);
    if (cpfResult.type === 'cpf') return cpfResult;

    const cnpjResult = this.processCNPJ(cleaned);
    if (cnpjResult.type === 'cnpj') return cnpjResult;

    const emailResult = this.processEmail(cleaned);
    if (emailResult.type === 'email') return emailResult;

    return { type: 'invalid', value: document };
  }

  private processCPF(document: string): DocumentProcessingResult {
    const numbersOnly = document.replace(/\D/g, '');

    if (numbersOnly.length === 11 && /^\d{11}$/.test(numbersOnly)) {
      return { type: 'cpf', value: numbersOnly };
    }

    return { type: 'invalid', value: document };
  }

  private processCNPJ(document: string): DocumentProcessingResult {
    const numbersOnly = document.replace(/\D/g, '');

    if (numbersOnly.length === 14 && /^\d{14}$/.test(numbersOnly)) {
      return { type: 'cnpj', value: numbersOnly };
    }

    return { type: 'invalid', value: document };
  }

  private processEmail(document: string): DocumentProcessingResult {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(document)) {
      return { type: 'email', value: document.trim() };
    }

    return { type: 'invalid', value: document };
  }
}
