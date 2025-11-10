import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LceStudentsModule } from './modules/lce-students/lce-students.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralStudentsModule } from './modules/general-students/general-students.module';
import { DocsController } from './docs.controller';
import { SharedModule } from './shared/shared.module';
import { SecretGuard } from './security/secret.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    LceStudentsModule,
    GeneralStudentsModule,
    SharedModule,
  ],
  controllers: [DocsController],
  providers: [SecretGuard],
})
export class AppModule {}
