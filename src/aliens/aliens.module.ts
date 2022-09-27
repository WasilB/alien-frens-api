import { Module } from '@nestjs/common';
import { AliensService } from './aliens.service';
import { AliensController } from './aliens.controller';

@Module({
  controllers: [AliensController],
  providers: [AliensService]
})
export class AliensModule {}
