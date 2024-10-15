import * as fs from 'fs';
import * as path from 'path';

export default class DataReader {
  static readJSON(filePath: string): any {
    const absolutePath = path.resolve(__dirname, filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  }
}