import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { ROLES_KEY } from './roles.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const activatable = await super.canActivate(context);
    if (!activatable) {
      return false;
    }

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // {@link Roles} 데코레이터가 없으면 {@code true}를 반환한다.
    if (!roles) {
      return true;
    }

    const req = this.getRequest(context);
    // {@link Roles} 데코레이터가 있을 경우 role에 따라 {@code true} 또는 {@code false}를 반환한다.
    if (roles.includes(req.user?.role)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * handleRequest는 Request에 user가 있으면 user를 반환하고 없으면 false를 반환하지만
   * user가 없으면 undefined를 반환하도록 처리.
   *
   * @param err
   * @param user
   * @returns user || undefined
   */
  handleRequest(err, user) {
    if (err) {
      throw err;
    }

    return user || undefined;
  }

  getRequest(context: ExecutionContext) {
    return context.getType() === 'http'
      ? context.switchToHttp().getRequest()
      : GqlExecutionContext.create(context).getContext().req;
  }
}
