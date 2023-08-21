import { createHash } from 'crypto';

export async function generateHash(password: string) {
  //const salt = await crypto.randomBytes(16).toString('hex');
  const hashedPassword = await createHash('sha256')
    .update(password)
    .digest('hex');
  return hashedPassword;
}

export async function comparePasswordToHash(
  password: string,
  hashedPassword: string,
) {
  const hash = await generateHash(password);
  return hash === hashedPassword;
}
