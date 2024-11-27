import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as config from 'config';
import * as CryptoJS from 'crypto-js';

import { Relation } from './enum';
import {
  IAddUserFamily,
  IGetEncryptedPersonalData,
  IUpdateUserFamily,
} from './interface';
import { UserFamilyRepository } from './repository/user-family.repository';
import { filterValidFields } from '../common/util';

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

  async updateUserFamily(args: IUpdateUserFamily) {
    const { phoneNumber, accountNumber, userId, id, ...rest } = args;
    const userFamily = await this.userFamilyRepository.getOneById(id);
    if (userFamily.userId !== userId) {
      throw new ForbiddenException();
    }

    const encryptedPersonalData = this.getEncryptedPersonalData({
      phoneNumber,
      accountNumber,
    });

    const updateArgs = { ...encryptedPersonalData, ...rest };
    const familyUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(familyUpdateArgs).length > 0) {
      await this.userFamilyRepository.updateById(id, updateArgs);
    }

    return true;
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
