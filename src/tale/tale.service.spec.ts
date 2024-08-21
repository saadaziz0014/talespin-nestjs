import { Test, TestingModule } from '@nestjs/testing';
import { TaleService } from './tale.service';

describe('TaleService', () => {
  let service: TaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaleService],
    }).compile();

    service = module.get<TaleService>(TaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
