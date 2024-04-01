import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AirlinesModule } from './airlines/airlines.module';
import { Airline } from "./airlines/airlines.model";
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from "./tickets/tickets.model";
import { Flight } from "./flights/flights.model";
import { FlightsModule } from "./flights/flights.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Airline, Ticket, Flight],
      autoLoadModels: false,
      synchronize: true,
    }),
    AirlinesModule,
    TicketsModule,
    FlightsModule
  ],
})
export class AppModule {
}
