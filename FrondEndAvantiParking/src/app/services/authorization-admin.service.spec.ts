import { TestBed } from '@angular/core/testing';

import { AuthorizationAdminService } from './authorization-admin.service';

describe('AuthorizationAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationAdminService = TestBed.get(AuthorizationAdminService);
    expect(service).toBeTruthy();
  });
});
