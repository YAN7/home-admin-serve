// artilc 表
import { prop, modelOptions } from '@typegoose/typegoose';
@modelOptions({ schemaOptions: {timestamps: true} })
export class Article {
	@prop()
	title?: string
	@prop()
	viewContent?: string
	@prop()
	editContent?: string
	@prop()
	description?: string
	@prop()
	isDisplay?: boolean
}
