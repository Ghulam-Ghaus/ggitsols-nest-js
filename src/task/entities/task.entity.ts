import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    title!: string;

    @Column()
    description!: string;

    @Column({default: "draft"})
    status!: string;
    @Column()
    employee_id!: number;
}
