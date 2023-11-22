import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "src/auth/constants";

export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        console.log("token", token);
        let payld;
        if(!token)
            throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            payld= payload;
            console.log("verified ??", payload);
            
            req['user'] = payload;

        } catch {
            throw new UnauthorizedException();
        } finally {
            console.log("ver", payld);
            
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log("guard", request.headers);
        
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log(type,token);
        
        return type === 'Bearer' ? token : undefined;
      }
    
}