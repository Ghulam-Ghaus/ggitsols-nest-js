import {Entity, PrimaryGeneratedColumn ,Column} from 'typeorm';
@Entity({name:"employee"})
export class Employee {
   
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    employee_name!: string;
    @Column()
    e_email!: string;
    
}   

