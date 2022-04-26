import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResultsService } from './payment-results.service';

describe('PaymentResultsService', () => {
  let service: PaymentResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResultsService],
    }).compile();

    service = module.get<PaymentResultsService>(PaymentResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
