import { prop } from '@typegoose/typegoose';
export class Article {
	@prop()
	title: string
	@prop()
	content: string
}
