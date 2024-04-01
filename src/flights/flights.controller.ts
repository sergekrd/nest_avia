import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightDto } from './dto/flights.dto';
import { FlightInputDto } from './dto/flights.input';

@ApiTags('FLIGHTS')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Создание рейса' })
  @ApiResponse({ status: 201, description: 'Рейс успешно создан', type: FlightDto })
  @Post()
  async create(@Body() flightData: FlightInputDto): Promise<FlightDto> {
    return this.flightsService.create(flightData);
  }

  @ApiOperation({ summary: 'Получение всех рейсов' })
  @ApiResponse({ status: 200, description: 'Список всех рейсов', type: [FlightDto] })
  @Get()
  async findAll(): Promise<FlightDto[]> {
    return this.flightsService.findAll();
  }

  @ApiOperation({ summary: 'Получение рейса по id' })
  @ApiResponse({ status: 200, description: 'Рейс найден', type: FlightDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FlightDto> {
    return this.flightsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Удаление рейса по id' })
  @ApiResponse({ status: 200, description: 'Рейс успешно удален' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.flightsService.remove(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о рейсе' })
  @ApiResponse({ status: 200, description: 'Информация о рейсе успешно обновлена', type: FlightDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() flightData: FlightInputDto): Promise<FlightDto> {
    return this.flightsService.update(+id, flightData);
  }
}
