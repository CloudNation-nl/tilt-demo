import { Injectable } from '@nestjs/common';
import { constants } from 'fs/promises';
const fs = require('fs/promises');

@Injectable()
export class AppService {
  private readonly filePath = "./data/data.json"

  constructor() {
    this.prepareDataFile()
  }

  async get(): Promise<any> {
    let fileContents = await fs.readFile(this.filePath);

    return {
      ...JSON.parse(fileContents)
    }
  }

  async put(data: any): Promise<any> {
    let fileContentsBefore = JSON.parse(await fs.readFile(this.filePath));
    
    try {
      await fs.writeFile(this.filePath, JSON.stringify({
        ...fileContentsBefore,
        ...data
      }))
    } catch (e) {
      console.log('Something went wrong while updating the datafile.')
      console.error(e)
    }

    let fileContents = await fs.readFile(this.filePath);
    return {
      ...JSON.parse(fileContents)
    }
  }

  private async prepareDataFile() {
    try {
      await fs.access(this.filePath, constants.R_OK && constants.W_OK)
    } catch {
      console.log('creating datafile as it did not exist.')
      try {
        await this.createFile()
      } catch(e) {
        await this.createDir()
      }
    }
  }

  private async createFile() {
    const data = {
      name: "Bert",
      url: "https://google.com/"
    }
    await fs.appendFile(this.filePath, JSON.stringify(data))
  }

  private async createDir() {
    await fs.mkdir('./data');
    await this.createFile()
  }
}
