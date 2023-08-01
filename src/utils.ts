import { HttpException, HttpStatus } from '@nestjs/common';
import { z } from 'nestjs-zod/z';

const idStringSchema = z.string().uuid();

export function checkExists<T>(
  el: T | null | undefined,
  msg = 'Element not found',
): NonNullable<T> {
  if (el == null) {
    throw new HttpException(msg, HttpStatus.NOT_FOUND);
  }
  return el as any;
}

export function throwForbidden(msg: string) {
  throw new HttpException(msg, HttpStatus.FORBIDDEN);
}

export function checkId(id: string) {
  const validateResult = idStringSchema.safeParse(id);
  if (!validateResult.success) {
    throw new HttpException(
      'Provided string is not an uuid',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export function throwConflict(msg: string) {
  throw new HttpException(msg, HttpStatus.CONFLICT);
}

export function isNotNull<T>(el: T | null | undefined): el is T {
  return el != null;
}

export function throwUnprocessableEntity(msg = 'Unprocessable entity') {
  throw new HttpException(msg, HttpStatus.UNPROCESSABLE_ENTITY);
}
