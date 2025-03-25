import { ZodTypeAny } from 'zod';

function validation<T extends ZodTypeAny>(schema: T, body: { [key: string]: unknown }) {
  const result = schema.safeParse(body);

  return result;
}

export default validation;
