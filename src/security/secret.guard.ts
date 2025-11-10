import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class SecretGuard implements CanActivate {
  private readonly logger = new Logger(SecretGuard.name);

  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientSecret = this.extractSecretFromHeader(request);
    const validSecret = process.env.API_SECRET;

    if (!validSecret) {
      this.logger.error(
        'API_SECRET is not configured in environment variables',
      );
      throw new Error('API_SECRET is not configured in environment variables');
    }

    if (!clientSecret) {
      throw new UnauthorizedException('Secret header is required');
    }

    if (clientSecret !== validSecret) {
      throw new UnauthorizedException('Invalid secret');
    }

    return true;
  }

  private extractSecretFromHeader(request: Request): string | undefined {
    const secretHeader = request.headers['secret'];

    if (!secretHeader) {
      return undefined;
    }

    return Array.isArray(secretHeader) ? secretHeader[0] : secretHeader;
  }
}
