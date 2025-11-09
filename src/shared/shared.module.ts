import { Module } from '@nestjs/common';
import { DocumentProcessor } from './document-processor';

@Module({
  imports: [],
  controllers: [],
  providers: [DocumentProcessor],
  exports: [DocumentProcessor],
})
export class SharedModule {}
