import { Test, TestingModule } from '@nestjs/testing';
import { RutinaDiasController } from './rutina-dias.controller';

describe('RutinaDiasController', () => {
  let controller: RutinaDiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutinaDiasController],
    }).compile();

    controller = module.get<RutinaDiasController>(RutinaDiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
