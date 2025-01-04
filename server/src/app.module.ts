import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
// import { ListingsModule } from './modules/listings/listings.module';
// import { UsersModule } from './modules/users/users.module';
// import { WidgetModule } from './modules/widget/widget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('databas.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    // ListingsModule,
    // UsersModule,
    // WidgetModule,
  ],
})
export class AppModule {}
