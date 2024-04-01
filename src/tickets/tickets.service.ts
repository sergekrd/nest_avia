import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './tickets.model';
import { TicketDto } from './dto/tickets.dto';
import { Flight } from 'src/flights/flights.model';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private ticketsRepository: typeof Ticket,
  ) { }

  async create(ticketData: TicketDto): Promise<TicketDto> {
    const flight = await Flight.findOne({ where: { id: ticketData.flightId } })
    if (!flight) throw new BadRequestException(`No flights with id: ${ticketData.flightId}`)
    return this.ticketsRepository.create(ticketData);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.findAll();
  }

  async findOne(id: number): Promise<Ticket> {
    return this.ticketsRepository.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.ticketsRepository.findByPk(id)
    if (!ticket) throw new BadRequestException(`No ticket with id: ${id}`)
    await ticket.destroy();
  }

  async findAllByAirlineId(airlineId: number): Promise<Ticket[]> {
    return this.ticketsRepository.findAll({
      where: { flight: { where: { airlineId } } },
    });
  }
Ticket
  async update(id: number, ticketData: TicketDto): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({ where: { id } });
    if (!ticket) throw new BadRequestException(`No ticket with id: ${id}`)
    const flight = await Flight.findOne({ where: { id: ticketData.flightId } })
    if (!flight) throw new BadRequestException(`No flights with id: ${ticketData.flightId}`)
    return await ticket.update(ticketData);
  }
}
