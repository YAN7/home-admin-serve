import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from '@router/blog/blog.module';
import { UserModule } from '@router/user/user.module';

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/blog-api", {
      useNewUrlParser: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        }
      }
    }),
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule]
})
export class AppModule {}
