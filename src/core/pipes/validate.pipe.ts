import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    console.log('errors: ', errors);
    if (errors.length > 0) {
      throw new UnprocessableEntityException(this.handleError(errors));
    }
    return value;
  }

  private handleError(errors: any) {
    return errors.map((error) => error.constraints);
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
