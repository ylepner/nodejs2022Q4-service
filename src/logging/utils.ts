import { join } from 'path';
import { appendFile, stat } from 'fs/promises';

const sizeLimitInBytes = (Number(process.env.LOG_SIZE_KB) || 10) * 1024;
let count = 0;
let currentFileSizeInBytes = 0;

export async function writeToFile(message: string) {
  const path = join(process.cwd(), '', `/logs(${count}).log`);
  // const size = await checkSize(path);
  // if (size) {
  //   if (currentFileSizeInBytes + size <= sizeLimitInBytes) {
  //     currentFileSizeInBytes += size;
  //   } else {
  //     count += 1;
  //     currentFileSizeInBytes = size;
  //   }
  // }
  try {
    // почему тот же path??
    // почему файлы в гитигнор
    await appendFile(path, message + '\n');
  } catch (err) {
    console.log('Error appending to file:', err);
  }
}

export async function writeToErrorFile(message: string) {
  const path = join(process.cwd(), '', `/errors.log`);
  try {
    await appendFile(path, message + '\n');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

async function checkSize(path: string) {
  try {
    const fileStat = await stat(path);
    return fileStat.size;
  } catch {
    return null;
  }
}
