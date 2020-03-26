import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.model';
import { ArticleService } from './article.service';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  exports: [ArticleService],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
