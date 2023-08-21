import { join } from 'path';
import { appendFile, stat, mkdir } from 'fs/promises';

const sizeLimitInBytes = (Number(process.env.LOG_SIZE_KB) || 10) * 1024;
let count = 0;
let currentFileSizeInBytes = 0;

let checked = false;
const logFileName = getLogName();
export async function writeToFile(message: string, type: string) {
  const folder = join(process.cwd(), 'logs');
  if (!checked) {
    try {
      console.log(`Creating folder ${folder}`)
      await mkdir(folder, {
        recursive: true,
      });
    } catch (e) {
      console.error(`Cannot create folder ${folder}`);
      console.error(e);
    }

    checked = true;
  }
  let path;
  type === 'error' ? path = join(folder, `errors-${logFileName}`) : path = join(folder, logFileName);
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
    await appendFile(path, message + '\n');
  } catch (err) {
    console.log('Error appending to file:', err);
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

function getLogName() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const filename = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}.log`;
  return filename;
}