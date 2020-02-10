import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Article } from './article.model';
import { createArticleDto } from './article.dto';



/**
 * @return 文章列表
 */
@Controller('blog/article')
@ApiTags('文章')
export class ArticleController {
	constructor(
		@InjectModel(Article) private readonly ArticleModel: ModelType<Article>
	) {}
	@Get()
	@ApiOperation({ summary: '文章列表' })
	async index() {
		return await this.ArticleModel.find();
	}

	/**
	 * @param createDto 文章内容
	 * @return 创建是否成功信息
	 */
	@Post()
	@ApiOperation({ summary: '创建文章' })
	async create(@Body() createDto:createArticleDto ) {
		await this.ArticleModel.create(createDto);
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
	async update(@Param('id') id: string, @Body() updateDto: createArticleDto) {
		const res = await this.ArticleModel.findByIdAndUpdate(id, updateDto);
		return res;
	}

	/**
	 * * 删除文章
	 */
	@Delete(':id')
	@ApiOperation({ summary: '删除文章' })
	async remove(@Param('id') id) {
		await this.ArticleModel.findByIdAndDelete(id);
		return {
			success: true
		}
	}
}
