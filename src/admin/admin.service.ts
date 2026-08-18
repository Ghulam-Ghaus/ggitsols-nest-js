import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Task } from 'src/task/entities/task.entity';
import { FindTaskDto } from 'src/task/dto/find-task.dto';
import { FindAdminDto } from './dto/find-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository:Repository<Admin>,
  ){}
  async create(createAdminDto: CreateAdminDto) {

    const admin = this.adminsRepository.create(createAdminDto)

    return await this.adminsRepository.save(admin)
  }

  async findAll() {
    return await this.adminsRepository.find()
  }

  async findOne(id: number) {
    return await this.adminsRepository.findOne({
      where:{id}
    })
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsRepository.findOne({
      where:{id}
    })
    if(!admin){
      return 'admin not found!'
    }
    admin.status = updateAdminDto.status
    return this.adminsRepository.save(admin)
  }

  async remove(id: number) {
    return await this.adminsRepository.delete(id)
  }

  async search(findadminDto: FindAdminDto) {
    console.log(findadminDto)
  
    let query = this.adminsRepository.createQueryBuilder('admin');
  
    if(findadminDto.name){
    query = query.andWhere(`admin.name like '%${findadminDto.name}%'`);
    }
  
    if(findadminDto.password){
      query = query.andWhere(`admin.password like '%${findadminDto.password}%'`);
    }
  
    if(findadminDto.taskId){
      query = query.andWhere(`admin.taskId = ${findadminDto.taskId}`);
    }
  
    const admin = await query.getMany();     
    if(admin.length !== 0) {
      return 'No admins found!';
    }
    return admin;
  
  }
   
  
  
  
}
