import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { User } from './user.model';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule
  ],
  controllers: [UserController],
  providers: [LocalStrategy, JwtStrategy]
})
export class UserModule {}
