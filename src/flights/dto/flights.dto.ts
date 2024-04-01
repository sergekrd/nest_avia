import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt, IsDate, Min, IsDateString } from "class-validator";

export class FlightDto {
  @ApiProperty({ example: "TN-00001", description: "Номер рейса" })
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @ApiProperty({ example: "2024-03-04T12:30", description: "Дата и время вылета" })
  @IsDateString()
  @IsNotEmpty()
  departureDateTime: Date;

  @ApiProperty({ example: 120, description: "Длительность полета в минутах" })
  @IsInt()
  @Min(1)
  flightDurationMinutes: number;

  @ApiProperty({ example: "Москва", description: "Город отправления" })
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @ApiProperty({ example: "Цюрих", description: "Город прибытия" })
  @IsString()
  @IsNotEmpty()
  arrivalLocation: string;

  @ApiProperty({ example: 100, description: "Общее количество мест" })
  @IsInt()
  @Min(1)
  totalSeats: number;

  @ApiProperty({ example: 1, description: "Идентификатор авиакомпании" })
  @IsInt()
  @IsNotEmpty()
  airlineId: number;
}
