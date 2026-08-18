import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    id!: number;
    status!: string;
    adminId!: number;
    title!: string;
    description!: string;
    employee_id!: number;
}
