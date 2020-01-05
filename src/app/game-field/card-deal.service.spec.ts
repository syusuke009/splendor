import { TestBed } from '@angular/core/testing';

import { CardDealService } from './card-deal.service';

describe('CardDealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardDealService = TestBed.get(CardDealService);
    expect(service).toBeTruthy();
  });
});
