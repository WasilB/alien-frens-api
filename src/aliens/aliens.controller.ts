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
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AliensService } from './aliens.service';
import { AlienDTO } from './dto/create-alien.dto';

import { diskStorage } from 'multer';

@Controller('aliens')
export class AliensController {
  static dest = './uploads/';
  constructor(private readonly aliensService: AliensService) {}

  @Post('uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: AliensController.dest,
        filename: (req, file, cb) => {
          return cb(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  create(
    @Body() createAlienDto: AlienDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file,
  ) {
    try {
      let imageUrl = `./uploads/${file.filename}`;

      createAlienDto.alienImagePath = imageUrl;

      return this.aliensService.create(createAlienDto, file);
    } catch (error) {}
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
