import type { GrpcOptions } from '@nestjs/microservices'
import { PROTO_PATHS } from '@vendee-cinema/contracts'

export const grpcPackages = ['user.v1']

export const grpcProtoPaths = [PROTO_PATHS.USER]

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
