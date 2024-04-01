import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AirlinesController } from "./airlines.controller";
import { AirlinesService } from "./airlines.service";
import { Airline } from "./airlines.model";


@Module({
  imports: [
    SequelizeModule.forFeature([Airline]),
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService],
  exports: [AirlinesService],
})
export class AirlinesModule {}
