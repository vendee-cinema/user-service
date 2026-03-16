import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = (
	configService: ConfigService
): TypeOrmModuleOptions => ({
	type: 'postgres',
	host: configService.getOrThrow<string>('DATABASE_HOST'),
	port: configService.getOrThrow<number>('DATABASE_PORT'),
	username: configService.getOrThrow<string>('DATABASE_USER'),
	password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
	database: configService.getOrThrow<string>('DATABASE_NAME'),
	synchronize: configService.getOrThrow<string>('DATABASE_SYNC') === 'true',
	logging: configService.getOrThrow<boolean>('DATABASE_LOGGING')
})
