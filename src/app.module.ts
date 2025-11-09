import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LceStudentsModule } from './modules/lce-students/lce-students.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralStudentsModule } from './modules/general-students/general-students.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
  providers: [],
})
export class AppModule {}
