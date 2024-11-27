import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as config from 'config';
import * as CryptoJS from 'crypto-js';

import { Relation } from './enum';
import { IAddUserFamily, IGetEncryptedPersonalData } from './interface';
import { UserFamilyRepository } from './repository/user-family.repository';

@Injectable()
export class UserFamilyService {
  private readonly personalSecret = {
    phoneNumber: config.get<string>('secretForPersonal.phoneNumber'),
    accountNumber: config.get<string>('secretForPersonal.accountNumber'),
  };

  constructor(private readonly userFamilyRepository: UserFamilyRepository) {}

  async addUserFamily(args: IAddUserFamily) {
    await this.verifyExistingFamily(args.userId, args.relation);

    const { phoneNumber, accountNumber, ...rest } = args;
    const encryptedPersonalData = this.getEncryptedPersonalData({
      phoneNumber,
      accountNumber,
    });
    await this.userFamilyRepository.add({ ...rest, ...encryptedPersonalData });
    return true;
  }

  private async verifyExistingFamily(userId: number, relation: Relation) {
    const existingFamily =
      await this.userFamilyRepository.getOneByUserIdAndRelation(
        userId,
        relation,
      );
    if (existingFamily) {
      throw new BadRequestException('이미 등록된 가족입니다.');
    }
  }

  private getEncryptedPersonalData(personalData: IGetEncryptedPersonalData) {
    const encryptedPersonalData = {};
    for (const key in personalData) {
      if (personalData[key] === undefined) {
        continue;
      }

      encryptedPersonalData[key] = this.encryptPersonalData(
        key,
        personalData[key],
      );
    }

    return encryptedPersonalData;
  }

  private encryptPersonalData(key: string, data: string) {
    const secretKey = this.personalSecret[key];
    if (!secretKey) {
      throw new InternalServerErrorException();
    }

    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }
}
