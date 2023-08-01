import { Test, TestingModule } from '@nestjs/testing';
import { ArtisnpmService } from './artisnpm.service';

describe('ArtisnpmService', () => {
  let service: ArtisnpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtisnpmService],
    }).compile();

    service = module.get<ArtisnpmService>(ArtisnpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
