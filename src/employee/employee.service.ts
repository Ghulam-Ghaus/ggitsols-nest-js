import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { FindEmployeeDto } from './dto/find-employee.dto';





@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,


  ) { }
  async create(createEmployeeDto: CreateEmployeeDto) {
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
    const emp = await this.employeeRepository.findOne({ where: { id } })
    if (!emp) {
      return "Task not found";
    }
    emp.e_email = updateEmployeeDto.e_email;
    emp.employee_name= updateEmployeeDto.employee_name;
     return await this.employeeRepository.save(emp)

  }
  async remove(id: number) {
    const task = await this.employeeRepository.findOne({ where: { id } })
    if (!task) {
      return `task not found`

    }
    return await this.employeeRepository.delete(task)

  }
  //  async searchwithpost(createEmployeeDto: CreateEmployeeDto) {
  //      const emp_post = this.employeeRepository.searchwithpost (createEmployeeDto);
  //    }


  async searchwithpost(findEmployeeDto: FindEmployeeDto) {
  let employeeQuery = this.employeeRepository.createQueryBuilder('employee');

  if (findEmployeeDto.e_email) {
    employeeQuery = employeeQuery.andWhere({
      e_email: findEmployeeDto.e_email,
    });
  }

  if (findEmployeeDto.employee_name) {
    employeeQuery = employeeQuery.andWhere(`employee.employee_name ilike (:name)`,{name:findEmployeeDto.employee_name})
  }

  const employees = await employeeQuery.getMany();

  if (employees.length === 0) {
    return 'employee not found';
  }

  return employees;
}

  async search(employeeObject: FindEmployeeDto) {
    let empQuery = this.employeeRepository.createQueryBuilder("employee");
  
    console.log(employeeObject.e_email)
    if (employeeObject.e_email){
      empQuery = empQuery.andWhere({
        e_email: employeeObject.e_email,
      })
    }
    if (employeeObject.employee_name) {
      empQuery = empQuery.andWhere(`employee.employee_name ilike (:name)`,{name:employeeObject.employee_name})
      // raw query formate with variable and its object
    //    empQuery.andWhere('LOWER(employee.employee_name) LIKE LOWER(:name)', {
    //     name: `%${employeeObject.employee_name}%`,
    // });
    }


    const emp = await empQuery.getMany()
    if (emp.length === 0) {
      return "task not found"
    }
    return emp

  }













}
