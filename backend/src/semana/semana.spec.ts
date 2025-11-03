import { Test, TestingModule } from '@nestjs/testing';
import { RutinaDiasService } from './semana.service';

describe('RutinaDiasService', () => {
  let service: RutinaDiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RutinaDiasService],
    }).compile();

    service = module.get<RutinaDiasService>(RutinaDiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
