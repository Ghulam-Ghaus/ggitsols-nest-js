import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Task } from 'src/task/entities/task.entity';

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
}
