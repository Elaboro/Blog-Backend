import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj: any = plainToClass(metadata.metatype, value);
        const error = await validate(obj);

        if(error.length) {
            let message = error.map(e => {
                return `[ ${e.property} ] ${Object.values(e.constraints).join(" ")}`
            });
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }

        return value;
    }
}