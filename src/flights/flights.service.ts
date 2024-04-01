import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flight } from './flights.model';
import { FlightInputDto } from './dto/flights.input';
import { Airline } from 'src/airlines/airlines.model';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight)
    private flightRepository: typeof Flight,
  ) { }

  async create(flightData: FlightInputDto): Promise<Flight> {
    flightData.departureDateTime = new Date(flightData.departureDateTime);
    const airline = await Airline.findOne({ where: { id: flightData.airlineId } })
    if (!airline) throw new BadRequestException(`No airline with id: ${flightData.airlineId}`)
    return this.flightRepository.create(flightData);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightRepository.findAll();
  }

  async findAllByAirlineId(airlineId: number): Promise<Flight[]> {
    return this.flightRepository.findAll({ where: { airlineId } });
  }

  async findOne(id: number): Promise<Flight> {
    return this.flightRepository.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) throw new BadRequestException(`No flight with id: ${id}`)
    await flight.destroy();
  }

  async update(id: number, flightData: FlightInputDto): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) throw new BadRequestException(`No flight with id: ${id}`)
    const airline = await Airline.findOne({ where: { id: flightData.airlineId } });
    if (!airline) throw new BadRequestException(`No airline with id: ${flightData.airlineId}`)
    return await flight.update(flightData);
  }


}
