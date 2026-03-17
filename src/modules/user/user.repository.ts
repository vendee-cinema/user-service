import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities'

@Injectable()
export class UserRepository {
	public constructor(
		@InjectRepository(User) private readonly repository: Repository<User>
	) {}

	public async findById(id: string) {
		return await this.repository.findOne({ where: { id } })
	}

	public async create(data: Partial<User>) {
		const user = this.repository.create(data)
		return this.repository.save(user)
	}

	public async update(id: string, data: Partial<User>) {
		await this.repository.update({ id }, data)
		return await this.findById(id)
	}
}
