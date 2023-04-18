import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): any {
    return this.appService.get();
  }

  @Put()
  put(@Body() data: any): any {
    return this.appService.put(data);
  }
}
