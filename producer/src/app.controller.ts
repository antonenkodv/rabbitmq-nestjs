import {Controller, Get, Inject, InternalServerErrorException, Post} from "@nestjs/common";
import {ClientProxy, RmqRecordBuilder} from "@nestjs/microservices";
import {firstValueFrom, timeout} from "rxjs";

@Controller()
export class AppController {
    constructor(@Inject('MATH_SERVICE') private rabbitClient: ClientProxy) {
    }

    @Get()
    healthCheck(){
        return 'health check';
    }

    @Post()
    async create() {
        const cat = {
            name: "Miayu",
            age: 2
        }

        const record = new RmqRecordBuilder(cat)
            .setOptions({
                headers: {
                    ['x-version']: '1.0.0',
                },
                priority: 3,
            })
            .build();
        const response = await firstValueFrom(this.rabbitClient.send('create-cat', record).pipe(timeout(60000))) // send msg to rabbit mq
        console.log(response)
        if (!response.result) {
            const message = response.error || 'Internal server error';
            throw new InternalServerErrorException(message);
        }

        return response
    }
}
