import { TestBed } from '@angular/core/testing';

import { CsvTableService } from './csv-table.service';

describe('CsvTableService', () => {
  let service: CsvTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
