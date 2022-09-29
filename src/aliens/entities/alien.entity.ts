import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('Alien')
export class AlienEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  alienName: string;

  @Column()
  @IsNotEmpty()
  alienRole: string;

  @Column()
  @IsNotEmpty()
  alienDescription: string;

  @Column({ nullable: true })
  alienImagePath: string;
}
