import { ApiOperation, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class createArticleDto {
	@ApiProperty({ title: '标题' })
	@IsNotEmpty({ message: '请填写标题' })
	title: string
	@ApiProperty({ title: '内容' })
	content: string
}