import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatUserDto } from './dto/update-user-dto';

export type RoleType = 'ENGINEER' | 'INTERN' | 'ADMIN';
let users: Array<CreateUserDto & { id: number }> = [
  {
    id: 1,
    name: 'Azer',
    role: 'ENGINEER',
    email: 'azer@mail.ru',
  },
  {
    id: 2,
    name: 'Leila',
    role: 'INTERN',
    email: 'leila@mail.ru',
  },
  {
    id: 3,
    name: 'Vagif',
    role: 'ADMIN',
    email: 'vagif@mail.ru',
  },
  {
    id: 4,
    name: 'OMAR',
    role: 'INTERN',
    email: 'omar@mail.ru',
  },
  {
    id: 5,
    name: 'CAMAL',
    role: 'ADMIN',
    email: 'camal@mail.ru',
  },
];

@Injectable()
export class UsersService {
  findAll(role?: RoleType) {
    if (role) {
      const usersWithRole = users.filter((item) => item.role === role);

      if (usersWithRole.length === 0) {
        throw new NotFoundException('Users with that role not found');
      }
      return usersWithRole;
    } else {
      return users;
    }
  }
  findOne(id: number) {
    const userTofind = users.find((item) => item.id === id);
    if (!userTofind) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return userTofind;
  }
  create(user: CreateUserDto) {
    const highestId = users.sort((a, b) => b.id - a.id)[0].id;
    const newUser = {
      id: highestId + 1,
      ...user,
    };
    users.push(newUser);
    return newUser;
  }
  deleteOne(id: number) {
    users = users.filter((item) => item.id !== id);
    return 'User deleted';
  }
  editOne(id: number, user: UpdatUserDto) {
    console.log(user);
    return 'User edited';
  }
}
