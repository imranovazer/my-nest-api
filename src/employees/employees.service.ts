import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { RoleType } from 'src/users/users.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: RoleType) {
    if (role)
      return this.databaseService.employee.findMany({
        where: { role },
      });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}
