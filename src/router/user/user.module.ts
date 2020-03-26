import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { User } from '@model/user.model';
import { LocalStrategy } from '@strategy';
import { JwtStrategy } from '@strategy';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule
  ],
  controllers: [UserController],
  providers: [LocalStrategy, JwtStrategy]
})
export class UserModule {}
