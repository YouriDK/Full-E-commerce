import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './app/item/item.module';
import { OrdersModule } from './app/orders/orders.module';
import { PaymentResultsModule } from './app/payment-results/payment-results.module';
import { ProductsModule } from './app/products/products.module';
import { User, UserSchema } from './app/users/user.schema';
import { UsersController } from './app/users/users.controller';
import { UsersModule } from './app/users/users.module';
import { ShippingAddressModule } from './app/shipping-address/shipping-address.module';
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
    ShippingAddressModule,
    ProductsModule,
    ItemModule,
    OrdersModule,
    PaymentResultsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
// * To apply a MiddleWare :
// * https://docs.nestjs.com/middleware
export class AppModule {}
