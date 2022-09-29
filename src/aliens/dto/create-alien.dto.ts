import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AlienDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alienName: string;

  @Column()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alienRole: string;

  @Column()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alienDescription: string;

  @Column({ nullable: true })
  alienImagePath: string;
}
