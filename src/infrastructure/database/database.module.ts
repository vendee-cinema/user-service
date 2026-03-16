import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getTypeOrmConfig } from '@/config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmConfig,
			inject: [ConfigModule]
		})
	]
})
export class DatabaseModule {}
