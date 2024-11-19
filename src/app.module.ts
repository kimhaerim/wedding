import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CheckListModule } from './check-list/check-list.module';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { CoupleModule } from './couple/couple.module';
import { AppDataSource } from './data-source';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { UserFamilyModule } from './user-family/user-family.module';
import { WeddingAttendModule } from './wedding-attend/wedding-attend.module';
import { WeddingChatModule } from './wedding-chat/wedding-chat.module';
import { WeddingInvitationModule } from './wedding-invitation/wedding-invitation.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...AppDataSource.options,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    CheckListModule,
    CoupleModule,
    FileModule,
    UserModule,
    UserFamilyModule,
    WeddingAttendModule,
    WeddingChatModule,
    WeddingInvitationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
