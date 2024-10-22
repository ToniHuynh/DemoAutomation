import * as fs from 'fs';
import * as path from 'path';

export default class DataReader {
  static readJSON(filename: string): any {
    const absolutePath = path.resolve(__dirname, `../data/${filename}`);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  }
}