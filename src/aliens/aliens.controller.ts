import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AliensService } from './aliens.service';
import { AlienDTO } from './dto/create-alien.dto';
import { extname } from 'path';

@Controller('aliens')
export class AliensController {
  constructor(private readonly aliensService: AliensService) {}

  @Post('uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/',
        filename: (req, file, cb) => {
          const filename: string = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${filename}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createAlienDto: AlienDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 10000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    let imageUrl = `./assets/${file.filename}`;

    return imageUrl;
  }

  @Get()
  findAll() {
    return this.aliensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aliensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlienDto: AlienDTO) {
    return this.aliensService.update(id, updateAlienDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aliensService.remove(id);
  }
}
