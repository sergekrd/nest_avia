import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { Airline } from './airlines.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirlineDto } from './dto/airlines.dto';

@ApiTags('AIRLINES')
@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @ApiOperation({summary: 'Создание авиакомпании'})
  @ApiResponse({status: 200, type: AirlineDto})
  @Post()
  create(@Body() airlineData: AirlineDto): Promise<AirlineDto> {
    return this.airlinesService.create(airlineData);
  }

  @ApiOperation({summary: 'Получение всех авиакомпаний'})
  @ApiResponse({status: 200, type: [Airline]})
  @Get()
  findAll(): Promise<Airline[]> {
    return this.airlinesService.findAll();
  }

  @ApiOperation({summary: 'Получение одной авиакомпании по id'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Airline> {
    return this.airlinesService.findOne(+id);
  }

  @ApiOperation({summary: 'Удаление авиакомпании'})
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.airlinesService.remove(+id);
  }
}

