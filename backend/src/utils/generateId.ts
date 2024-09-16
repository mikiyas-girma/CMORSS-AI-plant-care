import { randomBytes } from 'crypto';

export function generateUniqueId(length: number = 10): string {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}
