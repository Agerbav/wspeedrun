import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Global()
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit
{
  constructor() {
    super({
      adapter: new PrismaMariaDb({
        
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
    });
  }
    async onModuleInit() {
        return this.$connect();
    }

}
