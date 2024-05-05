import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppController} from "./app.controller";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        ClientsModule.registerAsync([
            {
                name: 'MATH_SERVICE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>(`RABBIT_MQ_URI`)],
                        queue: configService.get<string>(`RABBIT_MQ_QUEUE`),
                        queueOptions: {
                            durable: false
                        },
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [AppController]
})
export class AppModule {
}
