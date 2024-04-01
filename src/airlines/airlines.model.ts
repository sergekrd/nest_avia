import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Flight } from "src/flights/flights.model";


@Table({ tableName: "airlines" })
export class Airline extends Model<Airline> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Аэрофлот", description: "Наименование компании" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @ApiProperty({ example: "Россия", description: "Страна" })
  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @ApiProperty({ example: "true", description: "Статус" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @ApiProperty({ example: "1970", description: "Год основания" })
  @Column({ type: DataType.STRING, allowNull: true })
  founded: string;

  @ApiProperty({ example: "AF", description: "Код рейсов авиакомпании" })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  flights_code: string;

  @HasMany(() => Flight)
  flights: Flight[];
}
