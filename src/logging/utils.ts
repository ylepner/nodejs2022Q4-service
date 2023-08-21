import { join } from 'path';
import { appendFile, stat } from 'fs/promises';

const sizeLimitInBytes = (Number(process.env.LOG_SIZE_KB) || 10) * 1024;
let count = 0;
let currentFileSizeInBytes = 0;

export async function writeToFile(message: string) {
  const path = join(process.cwd(), '', `/logs(${count}).log`);

  if (await ifExists(path)) {
    const fileStat = await stat(path);
    if (fileStat) {
      currentFileSizeInBytes = fileStat.size;
    }
  }

  if (currentFileSizeInBytes >= sizeLimitInBytes) {
    count += 1;
    currentFileSizeInBytes = 0;
  }
  try {
    await appendFile(path, message + '\n');
    currentFileSizeInBytes += Buffer.from(message + '\n').length;
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

async function ifExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

// async function checkIfFileSizeInLimit(file: string) {
//   try {
//     const fileStat = await stat(file);
//     if (fileStat.size > sizeLimitInKb * 1024) {
//       return true;
//     } else {
//       return false;
//     };
//   } catch (err) {
//     console.log(file);
//     console.error('Error getting file size:', err);
//     return false;
//   }
// }
