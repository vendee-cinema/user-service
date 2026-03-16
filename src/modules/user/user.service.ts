import { Injectable } from '@nestjs/common'
import type { CreateUserRequest } from '@vendee-cinema/contracts/gen/user'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	public constructor(private readonly userRepository: UserRepository) {}

	public async create(data: CreateUserRequest) {
		return await this.userRepository.create({ id: data.id })
	}
}
