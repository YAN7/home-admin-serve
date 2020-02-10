import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { ArticleModule } from './article/article.module';

@Module({
  controllers: [BlogController],
  imports: [ArticleModule]
})
export class BlogModule {}
