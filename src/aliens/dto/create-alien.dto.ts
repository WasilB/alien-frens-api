import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class AlienDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alienName: string;

  @Column()
  alienRole: string;

  @Column()
  alienDescription: string;

  @Column()
  alienImagePath: string;
}
