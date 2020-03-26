import { Injectable } from '@nestjs/common';
import { Article } from '@model/article.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ArticleService {
	constructor(
		@InjectModel(Article) private readonly ArticleModel: ModelType<Article>,
	) {
	}

	// 文章列表
	async findAll() {
		return await this.ArticleModel.find();
		
	}

	// 创建文章
	async create(createDto) {
		return await this.ArticleModel.create(createDto);
	}

	// 更新文章
	async update(id, updateDto) {
		return await this.ArticleModel.findByIdAndUpdate(id, updateDto, { new: true });
	}

	// 删除文章
	async remove(id) {
		return await this.ArticleModel.findByIdAndDelete(id);
	}

}