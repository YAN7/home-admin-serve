import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDto {
	@ApiProperty({ title: '账号' })
	@IsNotEmpty()
	username: string


	/**
	 * 密码
	 */
	@ApiProperty({ title: '密码' })
	@IsNotEmpty()
	password: string
}