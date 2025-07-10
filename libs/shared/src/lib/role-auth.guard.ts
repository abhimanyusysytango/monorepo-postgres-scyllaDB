import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Admin access only');
    }
    return user;
  }
}

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role !== 'user') {
      throw new UnauthorizedException('User access only');
    }
    return user;
  }
}

@Injectable()
export class AdminUserAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role !== 'admin' && user.role !== 'user') {
      throw new UnauthorizedException('Only admin or user can access');
    }
    return user;
  }
} 