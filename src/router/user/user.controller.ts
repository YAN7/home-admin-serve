import { Controller, Post, Body, Get, Param, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User, UserDocument } from '@model/user.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/current-user.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { UserDto } from './user.dto';


@Controller('user')
@ApiTags('用户')
export class UserController {
	constructor(
		@InjectModel(User) private readonly UserModel: ModelType<User>,
		private jwtService: JwtService
	) {}

	/**
	 * @description 注册用户
	 */
	@Post('register')
	@SetMetadata('roles', ['admin'])
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@ApiOperation({ summary: '注册' })
	@ApiBearerAuth()
	async register(@Body() dto: UserDto) {
		const { username, password } = dto;
		const user = await this.UserModel.create({ username,  password })
		return user;
	}

	/**
	 * @description 登陆
	 */
	@Post('login')
	@ApiOperation({ summary: '登陆' })
	@UseGuards(AuthGuard('local'), RolesGuard)
	async login(@Body() dto: UserDto, @Req() req) {
		return {
			success: true,
			code: 200,
			token: this.jwtService.sign(String(req.user._id)),
		}
	}

	/**
	 * @description 获取用户信息
	 */
	@Get('user')
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@ApiOperation({ summary: '获取用户信息' })
	@ApiBearerAuth()
	async user(@CurrentUser() user: UserDocument) {
		return user;
	}
}