import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	PatchUserRequest,
	PatchUserResponse
} from '@vendee-cinema/contracts/gen/user'

import { UserService } from './user.service'

@Controller()
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@GrpcMethod('UserService', 'GetMe')
	public async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		return await this.userService.getMe(data)
	}

	@GrpcMethod('UserService', 'CreateUser')
	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		await this.userService.create(data)
		return { ok: true }
	}

	@GrpcMethod('UserService', 'PatchUser')
	public async patch(data: PatchUserRequest): Promise<PatchUserResponse> {
		await this.userService.patch(data)
		return { ok: true }
	}
}
