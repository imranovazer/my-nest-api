import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const isPwMatch = await bcrypt.compare(body.password, user.password);
    if (!isPwMatch) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async signup(body: AuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = await this.userRepository.save({
        email: body.email,
        username: body.username,
        password: hashedPassword,
      });
      //not good solution

      return this.signToken(newUser.id, newUser.email);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const data = { userId, email };
    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret: this.configService.get('ACCESS_SECRET'),
    });
    return { acessToken: token };
  }
}
