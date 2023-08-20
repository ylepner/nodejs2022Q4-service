import { join } from 'path';
import { appendFile } from "fs/promises";

export async function writeToFile(message: string, type: string) {
  const path = join(process.cwd(), '', `/logs-${type}`);
  try {
    await appendFile(path, message + '\n');
    console.log('Log message appended to log file successfully!');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}
