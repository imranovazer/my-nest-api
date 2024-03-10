import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';

import { UpdatUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

import { RoleType, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(@Query('role') role: RoleType) {
    return this.userService.findAll(role);
  }
  @Get('interns')
  findAllInterns() {
    return this.userService.findAll('INTERN');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  createOne(@Body(ValidationPipe) user: CreateUserDto) {
    return this.userService.create(user);
  }
  @Patch(':id')
  editOne(
    @Body(ValidationPipe) user: UpdatUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.editOne(id, user);
  }
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteOne(id);
  }
}
