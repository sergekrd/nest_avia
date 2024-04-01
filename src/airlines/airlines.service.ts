import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Airline } from './airlines.model';
import { AirlineDto } from './dto/airlines.dto';


@Injectable()
export class AirlinesService {
  constructor(
    @InjectModel(Airline)
    private airlineRepository: typeof Airline,
  ) {}

  async create(airlineData: AirlineDto): Promise<Airline> {
    return this.airlineRepository.create(airlineData);
  }

  async findAll(): Promise<Airline[]> {
    return this.airlineRepository.findAll();
  }

  async findOne(id: number): Promise<Airline> {
    return this.airlineRepository.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const airline = await this.findOne(id);
    await airline.destroy();
  }
}
