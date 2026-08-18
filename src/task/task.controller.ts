import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTaskDto } from './dto/find-task.dto';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  // creating the new end point
@Get('search')//method
 async search(@Query() findObject: FindTaskDto){//gave End point a name
  console.log(findObject)
  return this.taskService.search(findObject)

}
@Get()
findAll() {
  return this.taskService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.taskService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  return this.taskService.update(+id, updateTaskDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.taskService.remove(+id);
}
  // creating the new end point
  // @Get('search')//method
  // search(@Param('stem') stem:string){//gave End point a name
  //   console.log('stem')

    // return this.taskService.search(stem)

  // }     

}
