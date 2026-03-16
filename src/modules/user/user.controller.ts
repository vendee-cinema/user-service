import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	CreateUserRequest,
	CreateUserResponse
} from '@vendee-cinema/contracts/gen/user'

import { UserService } from './user.service'

@Controller()
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@GrpcMethod('UserService', 'CreateUser')
	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		await this.userService.create(data)
		return { ok: true }
	}
}
