import { prop, DocumentType } from "@typegoose/typegoose";
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;

export class User {
	@prop()
	username: string
	@prop({
		select: false,
		set(val) {
			return val ? hashSync(val) : val;
		},
		get(val) {
			return val;
		}
	})
	password: string

}