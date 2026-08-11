import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository:Repository<Task>,
  ){}
  async create(createTaskDto: CreateTaskDto) {

    const task = this.tasksRepository.create(createTaskDto)

    return await this.tasksRepository.save(task)
  }

  async findAll() {
    return await this.tasksRepository.find()
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({
      where:{id}
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({
      where:{id}
    })
    if(!task){
      return 'task not found!'
    }
    task.status = updateTaskDto.status
    return this.tasksRepository.save(task)
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id)
  }
}
