import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): any {
    return this.appService.get();
  }

  @Post()
  put(@Body() data: any): any {
    return this.appService.post(data);
  }
}
