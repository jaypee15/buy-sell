import { ConfigService } from "@nestjs/config";

export class EmailService {
    private transporter: any;

    constructor(private configService: ConfigService) {
        this.transporter =
    }
}