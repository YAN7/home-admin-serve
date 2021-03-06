import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@model/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		@InjectModel(User) private readonly UserModel: ModelType<User>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET,
		} as StrategyOptions)
	}

	async validate(id: string) {
		const user = await this.UserModel.findById(id)
		return user;
	}
}