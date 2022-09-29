import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliensModule } from './aliens/aliens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './assets' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: process.env.POSTGRES_HOST,
      //port: parseInt(<string>process.env.POSTGRES_PORT),
      //username: process.env.POSTGRES_USER,
      //password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AliensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
