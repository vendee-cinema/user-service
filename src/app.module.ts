import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './infrastructure/database'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UserModule
	]
})
export class AppModule {}
