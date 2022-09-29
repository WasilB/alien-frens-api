import { Injectable } from '@nestjs/common';
import { AlienDTO } from './dto/create-alien.dto';
import { AlienEntity } from './entities/alien.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class AliensService {
  constructor(
    @InjectRepository(AlienEntity)
    private readonly alienModel: Repository<AlienEntity>,
  ) {}
  create(createAlienDto: any): Observable<AlienDTO> {
    return from(this.alienModel.save(createAlienDto));
  }

  findAll(): Observable<AlienDTO[]> {
    return from(this.alienModel.find());
  }

  findOne(id: string): Observable<AlienDTO> {
    return from(this.alienModel.findOneBy({ id: id }));
  }

  update(id: string, updateAlienDto: AlienDTO): Observable<UpdateResult> {
    return from(this.alienModel.update(id, updateAlienDto));
  }

  remove(id: string): Observable<DeleteResult> {
    return from(this.alienModel.delete(id));
  }
}
