import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Ticket } from "./tickets.model";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

import { AirlinesModule } from "src/airlines/airlines.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Ticket]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
