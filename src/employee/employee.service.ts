import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';





@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,


  ) { }
  async create(createEmployeeDto:CreateEmployeeDto) {
    const task = this.employeeRepository.create(createEmployeeDto)
    return await this.employeeRepository.save(task)
  }
  async findAll() {
      return await this.employeeRepository.find();
  }
  async findOne(id: number) {
      return await this.employeeRepository.findOne({ where: { id } })
  }
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
      const task = await this.employeeRepository.findOne({ where: { id } })
      if (!task) {
        return "Task not found";
      }
    task.e_email = updateEmployeeDto.e_mail;
    return await this.employeeRepository.save(task)

  }
  async remove(id: number) {
    const task = await this.employeeRepository.findOne({where:{id}})
    if(!task){
      return `task not found`

    }
    return await this.employeeRepository.delete(task)
   
  }







  

  

  
  
}
