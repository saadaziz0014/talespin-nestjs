import { Test, TestingModule } from '@nestjs/testing';
import { TaleController } from './tale.controller';

describe('TaleController', () => {
  let controller: TaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaleController],
    }).compile();

    controller = module.get<TaleController>(TaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
