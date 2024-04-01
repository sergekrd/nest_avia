import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { TicketDto } from './dto/tickets.dto';
import { Ticket } from './tickets.model';

@ApiTags('TICKETS')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({summary: 'Создание билета'})
  @ApiResponse({status: 200, type: TicketDto})
  @Post()
  create(@Body() ticketData: TicketDto): Promise<TicketDto> {
    return this.ticketsService.create(ticketData);
  }

  @ApiOperation({summary: 'Получение всех билетов'})
  @ApiResponse({status: 200, type: [Ticket]})
  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @ApiOperation({summary: 'Получение одного билета по id'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(+id);
  }

  @ApiOperation({summary: 'Удаление билета'})
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(+id);
  }

  @Get('airline/:id')
  findAllByAirlineId(@Param('id') id: number): Promise<Ticket[]> {
    return this.ticketsService.findAllByAirlineId(id);
  }
}

