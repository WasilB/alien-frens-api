import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AliensService } from './aliens.service';
import { AlienDTO } from './dto/create-alien.dto';
import { Express } from 'express';

@Controller('aliens')
export class AliensController {
  constructor(private readonly aliensService: AliensService) {}

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createAlienDto: AlienDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    let imageUrl = `./assets/${file.filename}`;

    createAlienDto.alienImagePath = imageUrl;

    return this.aliensService.create(createAlienDto);
  }

  @Get()
  findAll() {
    return this.aliensService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aliensService.remove(id);
  }
}
