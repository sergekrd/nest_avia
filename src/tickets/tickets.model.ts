import { ApiProperty } from "@nestjs/swagger";
import { WhereOptions } from "sequelize";
import {
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Flight } from "src/flights/flights.model";

@Table({ tableName: "tickets" })
export class Ticket extends Model<Ticket> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "TN-FL001-001", description: "Номер билета" })
  @Column({ type: DataType.STRING, allowNull: false })
  ticketNumber: string;

  @ApiProperty({ example: 5000, description: "Цена билета" })
  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @ApiProperty({ example: true, description: "Статус билета (активен или нет)" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @ForeignKey(() => Flight)
  @Column
  flightId: number;

  @BelongsTo(() => Flight)
  flight: Flight;

  @BeforeValidate
  static async generateTicketNumber(instance: Ticket) {
    const whereOptions: WhereOptions = {
      where: {
        flightId: instance.flightId
      },
      order: [['id', 'DESC']]
    };
    const flight = await Flight.findOne({ where: { id: instance.flightId } })
    const latestTicket = await Ticket.count(whereOptions)
    const orderNumber = latestTicket + 1;
    instance.ticketNumber = `${flight.flightNumber}-${orderNumber.toString().padStart(3, '0')}`;
  }
}
