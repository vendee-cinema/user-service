import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { RpcStatus } from '@vendee-cinema/common'
import type {
	CreateUserRequest,
	GetMeRequest,
	PatchUserRequest
} from '@vendee-cinema/contracts/gen/ts/user'
import { lastValueFrom } from 'rxjs'

import { AccountClientGrpc } from '@/infrastructure/grpc/clients'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async getMe(data: GetMeRequest) {
		const { id } = data
		const profile = await this.userRepository.findById(id)
		if (!profile)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})
		const account = await lastValueFrom(this.accountClient.getAccount({ id }))
		return {
			user: {
				id: profile.id,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				phone: account.phone,
				email: account.email
			}
		}
	}

	public async create(data: CreateUserRequest) {
		const { id } = data
		return await this.userRepository.create({ id })
	}

	public async patch(data: PatchUserRequest) {
		const { userId, name, avatar } = data
		const user = await this.userRepository.findById(userId)
		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found'
			})
		await this.userRepository.update(userId, {
			...(name !== undefined && { name }),
			...(avatar !== undefined && { avatar })
		})
		return { ok: true }
	}
}
