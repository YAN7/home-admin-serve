import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Article } from './article.model';
import { createArticleDto, updateArticleDto } from './article.dto';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';

/**
 * @return 文章列表
 */
@Controller('blog/article')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('文章')
@ApiBearerAuth()
export class ArticleController {
	constructor(
		@InjectModel(Article) private readonly ArticleModel: ModelType<Article>,
		private readonly articleService: ArticleService,
	) {}
	@Get()
	@ApiOperation({ summary: '文章列表' })
	async index() {
		return await this.articleService.findAll();
	}

	/**
	 * @param createDto 文章内容
	 * @return 创建是否成功信息
	 */
	@Post()
	@ApiOperation({ summary: '创建文章' })
	async create(@Body() createDto:createArticleDto ) {
		await this.articleService.create(createDto);
		return createDto;
	}

	/**
	 * @param id 文章id
	 * @return 文章详情
	 */
	@Get(':id')
	@ApiOperation({ summary: '获取文章详情' })
	async detail(@Param('id') id: string) {
		return await this.ArticleModel.findById(id);
	}

	/**
	 * @description 更新文章
	 * @param id 文章id
	 * @param updateDto 更新文章内容对象 
	 */
	@Put(':id')
	@ApiOperation({ summary: '编辑文章' })
	async update(@Param('id') id: string, @Body() updateDto: updateArticleDto) {
		const res = await this.articleService.update(id, updateDto);
		return res;
	}

	/**
	 * * 删除文章
	 */
	@Delete(':id')
	@ApiOperation({ summary: '删除文章' })
	async remove(@Param('id') id) {
		await this.articleService.remove(id);
		return {
			success: true
		}
	}
}
