import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.model';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  controllers: [ArticleController]
})
export class ArticleModule {}
