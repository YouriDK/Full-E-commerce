import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './app/users/schema/user.schema';
import { UsersController } from './app/users/users.controller';
import { UsersModule } from './app/users/users.module';
// import { UsersService } from './app/users/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // * Pour enlever les warnings
      useUnifiedTopology: true,
    }),
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
// * To apply a MiddleWare :
// * https://docs.nestjs.com/middleware
export class AppModule {}
