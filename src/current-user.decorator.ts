import { SetMetadata, createParamDecorator } from '@nestjs/common';

// export const CurrentUser = (...args: string[]) => SetMetadata('current-user', args);
export const CurrentUser = createParamDecorator((data, req) => req.user)
