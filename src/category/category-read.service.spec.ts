import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CategoryReadService } from './category-read.service';
import { Category } from './entity';
import { CategoriesOrderBy } from './enum';
import { CategoryRepository } from './repository';
import { budgetSumMockData, categoryMockData } from '../../test/mock/data';
import { MockCategoryRepository } from '../../test/mock/repository';
import { OrderOption } from '../common/enum';

describe('CategoryReadService', () => {
  let service: CategoryReadService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryReadService,
        {
          provide: CategoryRepository,
          useValue: MockCategoryRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryReadService>(CategoryReadService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategory()', () => {
    it('카테고리 단일 조회', async () => {
      // given
      const id = 1;
      const coupleId = 1;

      jest
        .spyOn(categoryRepository, 'getOneById')
        .mockResolvedValue(categoryMockData);

      // when
      const result = await service.getCategory(id, coupleId);

      // then
      expect(categoryRepository.getOneById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.getOneById).toHaveBeenCalledWith(id);
      expect(result).toEqual(categoryMockData);
    });

    it('조회 권한이 없는 카테고리인 경우, 에러가 발생해야 한다.', async () => {
      // given
      const id = 1;
      const coupleId = 1;
      const categoryMockData = new Category();
      categoryMockData.coupleId = coupleId;
      jest
        .spyOn(categoryRepository, 'getOneById')
        .mockResolvedValue({ ...categoryMockData, coupleId: 2 });

      // when - then
      await expect(service.getCategory(id, 1)).rejects.toThrow(
        new ForbiddenException('권한이 없는 카테고리입니다.'),
      );

      expect(categoryRepository.getOneById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.getOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('getCategories()', () => {
    it('카테고리 목록 조회', async () => {
      // given
      const coupleId = 1;
      const offset = 0;
      const limit = 10;
      const orderBy = CategoriesOrderBy.CREATED_AT;
      const orderOption = OrderOption.DESC;

      jest
        .spyOn(categoryRepository, 'getManyByCoupleId')
        .mockResolvedValue([categoryMockData]);

      // when
      const result = await service.getCategories({
        coupleId,
        offset,
        limit,
        orderBy,
        orderOption,
      });

      // then
      expect(categoryRepository.getManyByCoupleId).toHaveBeenCalledTimes(1);
      expect(categoryRepository.getManyByCoupleId).toHaveBeenCalledWith({
        coupleId,
        offset,
        limit,
        orderBy,
        orderOption,
      });
      expect(result).toEqual([categoryMockData]);
    });
  });

  describe('getTotalCategoryBudget()', () => {
    it('카테고리 총 예산과 비용이 없는 경우', async () => {
      // given
      const coupleId = 1;
      const targetYear = 2025;
      const targetMonth = 1;

      jest
        .spyOn(categoryRepository, 'getTotalCategoryBudget')
        .mockResolvedValue(undefined);

      // when
      const result = await service.getTotalCategoryBudget({
        coupleId,
        targetYear,
        targetMonth,
      });

      // then
      expect(categoryRepository.getTotalCategoryBudget).toHaveBeenCalledTimes(
        1,
      );
      expect(categoryRepository.getTotalCategoryBudget).toHaveBeenCalledWith({
        coupleId,
        startDate: '2025-01-01',
        endDate: '2025-02-01',
      });
      expect(result).toEqual(undefined);
    });

    it('카테고리 총 예산과 비용이 있는 경우', async () => {
      // given
      const coupleId = 1;
      const targetYear = 2025;
      const targetMonth = 1;

      jest
        .spyOn(categoryRepository, 'getTotalCategoryBudget')
        .mockResolvedValue(budgetSumMockData);

      // when
      const result = await service.getTotalCategoryBudget({
        coupleId,
        targetYear,
        targetMonth,
      });

      // then
      expect(categoryRepository.getTotalCategoryBudget).toHaveBeenCalledTimes(
        1,
      );
      expect(categoryRepository.getTotalCategoryBudget).toHaveBeenCalledWith({
        coupleId,
        startDate: '2025-01-01',
        endDate: '2025-02-01',
      });
      expect(result).toEqual({
        budgetAmount: 0,
        id: 1,
        paidCost: 0,
        remainingBudget: 0,
        totalCost: 0,
        unpaidCost: 0,
      });
    });
  });
});
