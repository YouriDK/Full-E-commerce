import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../app/users/users.module';
import { AuthService } from './auth.service';

@Global() // ! Allow to use the Service everywhere 👌
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule /*.register({ defaultStrategy: 'jwt' })*/,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
