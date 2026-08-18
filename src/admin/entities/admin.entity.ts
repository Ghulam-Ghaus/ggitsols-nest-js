import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string; 

  @Column({ default: 'draft' })
  status!: string;

  @Column({ nullable: true})
  taskId!: number;
}