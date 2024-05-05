import {Controller} from "@nestjs/common";
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class AppController {
    constructor() {
    }

    @MessagePattern('create-cat')
    handler(@Payload() data: { name: string, age: number },
            @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        console.log(`Received data from producer: ${JSON.stringify(data,  null , 2)}`)
        return { result : true};
    }
}
