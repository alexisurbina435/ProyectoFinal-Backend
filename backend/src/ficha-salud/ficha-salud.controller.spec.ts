import { Test, TestingModule } from '@nestjs/testing';
import { FichaSaludController } from './ficha-salud.controller';

describe('FichaSaludController', () => {
  let controller: FichaSaludController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaSaludController],
    }).compile();

    controller = module.get<FichaSaludController>(FichaSaludController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
