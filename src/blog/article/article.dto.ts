/**
 * * dto 数据传输对象
 * 
 */
import { ApiOperation, ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class createArticleDto {
	@ApiProperty({ title: '标题' })
	@IsNotEmpty({ message: '请填写标题' })
	title: string

	@ApiProperty({ title: 'html格式内容' })
	@IsNotEmpty({ message: 'html格式内容不能为空' })
	viewContent: string

	@IsNotEmpty({ message: 'markdown格式内容不能为空' })
	@ApiProperty({ title: 'markdown格式内容' })
	editContent: string

	@ApiProperty({ title: '简介' })
	description: string

	@ApiProperty({ title: '是否展示' })
	isDisplay: boolean
}

export class updateArticleDto {
	@ApiProperty({ title: '标题' })
	title: string

	@ApiProperty({ title: 'html格式内容123' })
	viewContent: string

	@ApiProperty({ title: 'markdown格式内容' })
	editContent: string

	@ApiProperty({ title: '简介' })
	description: string

	@ApiProperty({ title: '是否展示' })
	isDisplay: boolean
}