import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Like, Repository } from 'typeorm';
import { FindTaskDto } from './dto/find-task.dto'

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

  async findAll(findTaskDto: FindTaskDto) {


    // const { searchTerm } = findTaskDto;

    return this.tasksRepository.find()
  }
  async findOne(id: number) {
    return await this.tasksRepository.findOne({
      where: { id }
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: { id }
    })
    if (!task) {
      return 'task not found!'
    }
    if(task.title){

      task.status = updateTaskDto.status
    }
     if(task.title){

      task.description = updateTaskDto.description
    }
     if(task.title){

      task.adminId = updateTaskDto.adminId
    }
     

    
    return this.tasksRepository.save(task)
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id)
  }

async search(findTaskDto: FindTaskDto) {
  console.log(findTaskDto)

  let query = this.tasksRepository.createQueryBuilder('task');

  if(findTaskDto.title){
  query = query.andWhere(`task.title like '%${findTaskDto.title}%'`);
  }

  if(findTaskDto.status){
    query = query.andWhere(`task.status like '%${findTaskDto.status}%'`);
  }

  if(findTaskDto.adminId){
    query = query.andWhere(`task.admin_id = ${findTaskDto.adminId}`);
  }

  const tasks = await query.getMany();
  if(tasks.length === 0) {
    return 'No tasks found!';
  }
  return tasks;

}
 
}

