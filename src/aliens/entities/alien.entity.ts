import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Alien')
export class AlienEntity {
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
