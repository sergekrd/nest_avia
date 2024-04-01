import { ApiProperty } from "@nestjs/swagger";
import { WhereOptions } from "sequelize";
import {
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Airline } from "src/airlines/airlines.model";
import { Ticket } from "src/tickets/tickets.model";

@Table({ tableName: "flights" })
export class Flight extends Model<Flight> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "TN-00001", description: "Номер рейса" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  flightNumber: string;

  @ApiProperty({ example: "2024-03-04T12:30", description: "Дата и время вылета" })
  @Column({ type: DataType.DATE, allowNull: false })
  departureDateTime: Date;

  @ApiProperty({ example: 120, description: "Длительность полета" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  flightDurationMinutes: number;

  @ApiProperty({ example: "Москва", description: "Город отправления" })
  @Column({ type: DataType.STRING, allowNull: false })
  departureLocation: string;

  @ApiProperty({ example: "Цюрих", description: "Город прибытия" })
  @Column({ type: DataType.STRING, allowNull: false })
  arrivalLocation: string;

  @ApiProperty({ example: 100, description: "Общее количество мест" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  totalSeats: number;

  @ForeignKey(() => Airline)
  @Column
  airlineId: number;

  @BelongsTo(() => Airline)
  airline: Airline;

  @HasMany(() => Ticket)
  tickets: Ticket[];

  @BeforeValidate
  static async generateFlightNumber(instance: Flight) {
    const whereOptions: WhereOptions = {
      where: {
        airlineId: instance.airlineId
      },
      order: [['id', 'DESC']]
    };
    const airline = await Airline.findOne({ where: { id: instance.airlineId } })
    const latestFlight = await Flight.count(whereOptions)
    const flightNumber = latestFlight + 1;
    console.log(instance)
    instance.flightNumber = `${airline.flights_code}-${flightNumber.toString().padStart(5, '0')}`;
  }
}
