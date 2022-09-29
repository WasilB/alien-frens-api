import { Module } from '@nestjs/common';
import { AliensService } from './aliens.service';
import { AliensController } from './aliens.controller';
import { AlienEntity } from './entities/alien.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlienEntity]),
    MulterModule.register({ dest: './assets' }),
  ],
  controllers: [AliensController],
  providers: [AliensService],
})
export class AliensModule {}
