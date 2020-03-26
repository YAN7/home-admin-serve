import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@model/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(
		@InjectModel(User) private readonly UserModel: ModelType<User>
	) {
		super({
			usernameField: 'username',
			passwordField: 'password'
		} as IStrategyOptions)
	}

	async validate(username: string, password: string) {
		const user = await this.UserModel.findOne({username}).select('+password');
		if (!user) {
			throw new BadRequestException('用户不存在!');
		}
		if (!compareSync(password, user.password)) {
			throw new BadRequestException('密码错误!');
		}
		return user;
	}
}