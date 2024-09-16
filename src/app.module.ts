import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AppDataSource } from './data-source';
import { CoupleModule } from './couple/couple.module';
import { UserFamilyModule } from './user-family/user-family.module';
import { WeddingInvitationModule } from './wedding-invitation/wedding-invitation.module';
import { CheckListModule } from './check-list/check-list.module';
import { FileModule } from './file/file.module';
import { WeddingAttendModule } from './wedding-attend/wedding-attend.module';
import { WeddingChatModule } from './wedding-chat/wedding-chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    UserModule,
    CoupleModule,
    UserFamilyModule,
    WeddingInvitationModule,
    CheckListModule,
    FileModule,
    WeddingAttendModule,
    WeddingChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
