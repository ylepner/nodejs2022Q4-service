import * as crypto from 'crypto';

export async function generateHash(password: string) {
  const salt = await crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
    .toString('hex');
  return hashedPassword;
}
