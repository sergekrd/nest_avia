import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { FlightsController } from "./flights.controller";
import { FlightsService } from "./flights.service";
import { Flight } from "./flights.model";
import { TicketsModule } from "../tickets/tickets.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Flight]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
