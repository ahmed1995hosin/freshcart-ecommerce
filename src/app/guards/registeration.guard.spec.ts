import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerationGuard } from './registeration.guard';

describe('registerationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
