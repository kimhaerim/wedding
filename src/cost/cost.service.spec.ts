import { Test, TestingModule } from '@nestjs/testing';

import { CostService } from './cost.service';
import { CostRepository } from './repository';
import { MockCheckListService } from '../../test/mock/service';
import { CheckListService } from '../check-list/check-list.service';
import { MockCostRepository } from '../../test/mock/repository';
import { checkListMockData, costMockData } from '../../test/mock/data';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('CostService', () => {
  let service: CostService;
  let checkListService: CheckListService;
  let costRepository: CostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CostService,
        {
          provide: CheckListService,
          useValue: MockCheckListService(),
        },
        {
          provide: CostRepository,
          useValue: MockCostRepository(),
        },
      ],
    }).compile();

    service = module.get<CostService>(CostService);
    checkListService = module.get<CheckListService>(CheckListService);
    costRepository = module.get<CostRepository>(CostRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCost()', () => {
    it('비용 단일 조회', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      const checkListId = 1;
      jest
        .spyOn(costRepository, 'getOneById')
        .mockResolvedValue({ ...costMockData, checkListId });

      jest.spyOn(checkListService, 'getCheckList').mockResolvedValue({
        ...checkListMockData,
        id: checkListId,
        isCompleted: true,
      });

      // when
      const result = await service.getCost(id, coupleId);

      // then
      expect(costRepository.getOneById).toBeCalledTimes(1);
      expect(costRepository.getOneById).toHaveBeenCalledWith(id);
      expect(checkListService.getCheckList).toBeCalledTimes(1);
      expect(checkListService.getCheckList).toBeCalledWith(
        checkListId,
        coupleId,
      );

      expect(result).toEqual({ ...costMockData, checkListId });
    });

    it('없는 비용을 조회하는 경우', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      jest.spyOn(costRepository, 'getOneById').mockResolvedValue(null);

      // when - then
      await expect(service.getCost(id, coupleId)).rejects.toThrow(
        new BadRequestException(),
      );

      expect(costRepository.getOneById).toHaveBeenCalledTimes(1);
      expect(costRepository.getOneById).toHaveBeenCalledWith(id);
      expect(checkListService.getCheckList).not.toHaveBeenCalled();
    });

    it('권한이 없는 체크리스트의 비용을 조회하는 경우', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      const checkListId = 1;
      jest
        .spyOn(costRepository, 'getOneById')
        .mockResolvedValue({ ...costMockData, checkListId });

      // when - then
      await expect(service.getCost(id, coupleId)).rejects.toThrow(
        new ForbiddenException(),
      );

      expect(costRepository.getOneById).toBeCalledTimes(1);
      expect(costRepository.getOneById).toHaveBeenCalledWith(id);
      expect(checkListService.getCheckList).toBeCalledTimes(1);
      expect(checkListService.getCheckList).toBeCalledWith(
        checkListId,
        coupleId,
      );
    });
  });

  describe('getCostsByCheckListId()', () => {
    it('비용 목록 조회', async () => {
      // given
      const checkListId = 1;
      const coupleIdId = 1;

      jest
        .spyOn(costRepository, 'getManyByCheckListId')
        .mockResolvedValue([{ ...costMockData, checkListId }]);

      // when
      const result = await service.getCostsByCheckListId(
        checkListId,
        coupleIdId,
      );

      // then
      expect(costRepository.getManyByCheckListId).toBeCalledTimes(1);
      expect(costRepository.getManyByCheckListId).toHaveBeenCalledWith(
        checkListId,
        coupleIdId,
      );

      expect(result).toEqual([{ ...costMockData, checkListId }]);
    });
  });

  describe('getDailyCostsByMonth()', () => {
    it('날짜 별 비용 목록', async () => {
      // given
      const targetYear = 2025;
      const targetMonth = 1;
      const coupleId = 1;

      jest
        .spyOn(costRepository, 'getMany')
        .mockResolvedValue([
          { ...costMockData, paymentDate: new Date('2025-01-20') },
        ]);

      // when
      const result = await service.getDailyCostsByMonth({
        targetYear,
        targetMonth,
        coupleId,
      });

      // then
      expect(costRepository.getMany).toBeCalledTimes(1);
      expect(costRepository.getMany).toHaveBeenCalledWith({
        startDate: '2025-01-01',
        endDate: '2025-02-01',
        coupleId,
      });

      const expectedResult = [
        {
          paymentDate: '2025-01-20',
          costs: [{ ...costMockData, paymentDate: new Date('2025-01-20') }],
        },
      ];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('addCost()', () => {
    it('비용 추가', async () => {
      // given
      const checkListId = 1;
      const coupleId = 1;
      const title = '비용';
      const amount = 0;

      jest
        .spyOn(checkListService, 'getCheckList')
        .mockResolvedValue({ ...checkListMockData, isCompleted: true });

      // when
      const result = await service.addCost({
        checkListId,
        coupleId,
        title,
        amount,
      });

      // then
      expect(checkListService.getCheckList).toBeCalledTimes(1);
      expect(checkListService.getCheckList).toBeCalledWith(
        checkListId,
        coupleId,
      );

      expect(costRepository.add).toBeCalledTimes(1);
      expect(costRepository.add).toHaveBeenCalledWith({
        checkListId,
        title,
        amount,
      });

      expect(result).toEqual(1);
    });

    it('권한이 없는 체크리스트에 비용 추가', async () => {
      // given
      const checkListId = 1;
      const coupleId = 1;
      const title = '비용';
      const amount = 0;

      // when -then
      await expect(
        service.addCost({ checkListId, coupleId, title, amount }),
      ).rejects.toThrow(new ForbiddenException());

      expect(checkListService.getCheckList).toBeCalledTimes(1);
      expect(checkListService.getCheckList).toBeCalledWith(
        checkListId,
        coupleId,
      );

      expect(costRepository.add).not.toHaveBeenCalled();
    });
  });
});
