import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsBoolean } from "class-validator";

export class TicketDto {
  @ApiProperty({ example: 5000, description: "Цена билета" })
  @IsNumber()
  price: number;

  @ApiProperty({ example: true, description: "Статус билета (активен или нет)" })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 1, description: "Идентификатор рейса" })
  @IsNumber()
  flightId: number;
}
