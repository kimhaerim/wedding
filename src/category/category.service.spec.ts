import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CategoryReadService } from './category-read.service';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository';
import {
  categoryMockData,
  checkListMockData,
  costMockData,
} from '../../test/mock/data';
import { MockCategoryRepository } from '../../test/mock/repository';
import {
  MockCategoryReadService,
  MockCheckListService,
  MockCostService,
} from '../../test/mock/service';
import { CheckListService } from '../check-list/check-list.service';
import { CostService } from '../cost/cost.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryReadService: CategoryReadService;
  let checkListService: CheckListService;
  let costService: CostService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryReadService,
          useValue: MockCategoryReadService(),
        },
        {
          provide: CheckListService,
          useValue: MockCheckListService(),
        },
        {
          provide: CostService,
          useValue: MockCostService(),
        },
        {
          provide: CategoryRepository,
          useValue: MockCategoryRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryReadService = module.get<CategoryReadService>(CategoryReadService);
    checkListService = module.get<CheckListService>(CheckListService);
    costService = module.get<CostService>(CostService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addCategory()', () => {
    it('카테고리 추가', async () => {
      // given
      const coupleId = 1;
      const title = '카테고리';
      const budgetAmount = 0;

      jest
        .spyOn(categoryRepository, 'getOneByTitleAndCoupleId')
        .mockResolvedValue(null);

      jest.spyOn(categoryRepository, 'add').mockResolvedValue([1]);

      // when
      const result = await service.addCategory({
        coupleId,
        title,
        budgetAmount,
      });

      // then
      expect(categoryRepository.getOneByTitleAndCoupleId).toHaveBeenCalledTimes(
        1,
      );
      expect(categoryRepository.getOneByTitleAndCoupleId).toHaveBeenCalledWith(
        title,
        coupleId,
      );
      expect(categoryRepository.add).toHaveBeenCalledTimes(1);
      expect(categoryRepository.add).toHaveBeenCalledWith([
        {
          coupleId,
          title,
          budgetAmount,
        },
      ]);
      expect(result).toEqual(1);
    });

    it('같은 제목의 카테고리가 있는 경우', async () => {
      // given
      const coupleId = 1;
      const title = '카테고리';
      const budgetAmount = 0;

      jest
        .spyOn(categoryRepository, 'getOneByTitleAndCoupleId')
        .mockResolvedValue({ ...categoryMockData, title, coupleId });

      // when - then
      await expect(
        service.addCategory({
          coupleId,
          title,
          budgetAmount,
        }),
      ).rejects.toThrow(new BadRequestException('이미 추가된 카테고리입니다.'));

      expect(categoryRepository.getOneByTitleAndCoupleId).toHaveBeenCalledTimes(
        1,
      );
      expect(categoryRepository.getOneByTitleAndCoupleId).toHaveBeenCalledWith(
        title,
        coupleId,
      );
      expect(categoryRepository.add).not.toHaveBeenCalled();
    });
  });

  describe('addCategories()', () => {
    it('카테고리 여러 개 추가', async () => {
      // given
      const coupleId = 1;
      const newCategory = [
        {
          title: '카테고리',
          budgetAmount: 0,
        },
        {
          title: '카테고리1',
          budgetAmount: 0,
        },
      ];

      jest.spyOn(categoryRepository, 'add').mockResolvedValue([1, 2]);

      // when
      const result = await service.addCategories(newCategory, coupleId);

      // then
      expect(categoryRepository.add).toHaveBeenCalledTimes(1);
      expect(categoryRepository.add).toHaveBeenCalledWith([
        {
          coupleId,
          title: '카테고리',
          budgetAmount: 0,
        },
        {
          coupleId,
          title: '카테고리1',
          budgetAmount: 0,
        },
      ]);
      expect(result).toEqual(true);
    });
  });

  describe('updateCategory()', () => {
    it('카테고리 수정', async () => {
      // given
      const id = 1;
      const coupleId = 1;
      const title = '카테고리';
      const budgetAmount = 0;

      jest
        .spyOn(categoryReadService, 'getCategory')
        .mockResolvedValue(categoryMockData);
      jest.spyOn(categoryRepository, 'updateById').mockResolvedValue(true);

      // when
      const result = await service.updateCategory({
        id,
        coupleId,
        title,
        budgetAmount,
      });

      // then
      expect(categoryRepository.updateById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.updateById).toHaveBeenCalledWith(id, {
        title,
        budgetAmount,
      });
      expect(result).toEqual(true);
    });

    it('수정할 항목이 없는 경우', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      jest
        .spyOn(categoryReadService, 'getCategory')
        .mockResolvedValue(categoryMockData);
      jest.spyOn(categoryRepository, 'updateById').mockResolvedValue(true);

      // when
      const result = await service.updateCategory({
        id,
        coupleId,
      });

      // then
      expect(categoryRepository.updateById).not.toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });

  describe('removeCategoryById()', () => {
    it('카테고리 삭제 (연결된 체크리스트와 비용 정보가 없는 경우)', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      jest
        .spyOn(categoryRepository, 'getOneWithCheckLists')
        .mockResolvedValue(categoryMockData);

      // when
      const result = await service.removeCategoryById(id, coupleId);

      // then
      expect(categoryRepository.removeById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.removeById).toHaveBeenCalledWith(id);
      expect(checkListService.removeCheckListsByIds).not.toHaveBeenCalled();
      expect(costService.removeCostsByIds).not.toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('카테고리 삭제 (연결된 체크리스트가 있는 경우)', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      const checkListId = 1;
      jest.spyOn(categoryRepository, 'getOneWithCheckLists').mockResolvedValue({
        ...categoryMockData,
        checkLists: [{ ...checkListMockData, id: checkListId }],
      });

      // when
      const result = await service.removeCategoryById(id, coupleId);

      // then
      expect(categoryRepository.removeById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.removeById).toHaveBeenCalledWith(id);
      expect(checkListService.removeCheckListsByIds).toHaveBeenCalledTimes(1);
      expect(checkListService.removeCheckListsByIds).toHaveBeenCalledWith([
        checkListId,
      ]);
      expect(costService.removeCostsByIds).not.toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('카테고리 삭제 (연결된 체크리스트와 비용이 있는 경우)', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      const checkListId = 1;
      const costId = 1;
      const checkLists = [
        {
          ...checkListMockData,
          id: checkListId,
          costs: [{ ...costMockData, id: costId }],
        },
      ];
      jest.spyOn(categoryRepository, 'getOneWithCheckLists').mockResolvedValue({
        ...categoryMockData,
        checkLists,
      });

      // when
      const result = await service.removeCategoryById(id, coupleId);

      // then
      expect(categoryRepository.removeById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.removeById).toHaveBeenCalledWith(id);
      expect(checkListService.removeCheckListsByIds).toHaveBeenCalledTimes(1);
      expect(checkListService.removeCheckListsByIds).toHaveBeenCalledWith([
        checkListId,
      ]);
      expect(costService.removeCostsByIds).toHaveBeenCalledTimes(1);
      expect(costService.removeCostsByIds).toHaveBeenCalledWith([costId]);
      expect(result).toEqual(true);
    });
  });
});
