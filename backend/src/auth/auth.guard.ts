import { ExecutionContext, Injectable } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    //  Buscar token en cookies
    let token = request.cookies?.token;

    //  Si no está, buscar token en header
    if (!token) {
      const authHeader = request.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) return false;

    try {
      const usuario = this.jwtService.verify(token);
      request.usuario = usuario;
      return true;
    } catch (error) {
      return false;
    }
  }
}
