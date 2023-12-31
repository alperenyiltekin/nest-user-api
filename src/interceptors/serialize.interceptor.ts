import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
}                               from '@nestjs/common';
import { plainToInstance }      from 'class-transformer';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { UserDto }              from 'src/users/dto/user.dto';


interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> | Promise<Observable<any>>   {
        
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}