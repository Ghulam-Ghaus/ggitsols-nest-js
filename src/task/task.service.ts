import { Injectable, Param, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { FindTaskDto } from './dto/find-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) { }
  async create(createTaskDto: CreateTaskDto) {

    const task = this.tasksRepository.create(createTaskDto)

    return await this.tasksRepository.save(task)
  }

  async findAll() {
    return await this.tasksRepository.find()
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id }
    })
    if (!task) {
      return { status: 404, message: `task related to the id ${id} is not found` }
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: { id }
    })
    if (!task) {
      return 'task not found!'
    }
    task.status = updateTaskDto.status
    return this.tasksRepository.save(task)
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id)
  }



  // return  await this.tasksRepository.search(term) 

  // const tasks = await this.tasksRepository.find(
  //   {
  //     where : 
  //       {status: `${term}`}
  //   }
  // )
  async search(findObject: FindTaskDto) {
    console.log(findObject)

    let resQuery = this.tasksRepository.createQueryBuilder('tasks');


    if (findObject.status) {
      resQuery = resQuery.andWhere({
        status: `ilike '${findObject.status}'`, // direct value insertion

      })
    }
    if (findObject.employee_id) {
      resQuery = resQuery.andWhere({
        employee_id: Number(findObject.employee_id)

      })
    }

    const tasks = await resQuery.getMany()
    if (tasks.length === 0) {
      return 'not found'
    }

    return tasks

  }
}

