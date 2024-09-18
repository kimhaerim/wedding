import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from './data-source';
import { CoupleModule } from './couple/couple.module';
import { UserFamilyModule } from './user-family/user-family.module';
import { WeddingInvitationModule } from './wedding-invitation/wedding-invitation.module';
import { CheckListModule } from './check-list/check-list.module';
import { FileModule } from './file/file.module';
import { WeddingAttendModule } from './wedding-attend/wedding-attend.module';
import { WeddingChatModule } from './wedding-chat/wedding-chat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

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
  providers: [AppService],
})
export class AppModule {}
