import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    title!: string;

    @Column({nullable:true})
    description!: string;

    @Column({ default: "draft" })
    status!: string;
    @Column({nullable: true})

    @Column({ name: 'admin_id', nullable: true }) 
    adminId?: number;

    @Column()
    employee_id!: number;
}
