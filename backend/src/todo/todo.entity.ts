import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = uuidv4();

  @Column()
  @ApiProperty()
  description: string;

  @Column({ type: 'date' })
  @ApiProperty()
  dueDate: string;

  @Column({ default: false })
  @ApiProperty()
  isDone: boolean;

  @CreateDateColumn({ name: 'created_at', select: false })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  @ApiProperty()
  deletedAt: Date;
}
