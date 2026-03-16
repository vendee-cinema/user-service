import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PROTO_PATHS } from '@vendee-cinema/contracts'

import { AccountClientGrpc } from '@/infrastructure/grpc/clients'

import { User } from './entities'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		ClientsModule.registerAsync([
			{
				name: 'ACCOUNT_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'account.v1',
						protoPath: PROTO_PATHS.ACCOUNT,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [UserController],
	providers: [UserService, UserRepository, AccountClientGrpc]
})
export class UserModule {}
