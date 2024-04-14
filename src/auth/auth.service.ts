import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { msg: 'You are loginned' };
  }
  signup() {
    return { msg: 'Your are registered' };
  }
}
