import { CreateUserDto } from './create-user-dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdatUserDto extends PartialType(CreateUserDto) {}
