import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class AirlineDto {
  @ApiProperty({ example: "Аэрофлот", description: "Наименование компании" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Россия", description: "Страна" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: true, description: "Статус" })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: "1970", description: "Год основания" })
  @IsString()
  @IsOptional()
  founded?: string;

  @ApiProperty({ example: "AF", description: "Код рейсов авиакомпании" })
  @IsString()
  @IsOptional()
  flights_code: string;
}
