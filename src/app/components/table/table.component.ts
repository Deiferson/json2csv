import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CsvTableService } from 'src/app/csv-table.service';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  
  searchForm = this.fb.group({
    search: ''
  });  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: any = [];

  constructor(private fb: FormBuilder, private csvTable: CsvTableService ) {
    this.dataSource = new TableDataSource(csvTable);    
  }
  ngOnInit(): void {
    this.displayedColumns= this.dataSource.header;

    this.searchForm.valueChanges.subscribe(changes => {
      alert(changes.search)
    });
  }

  reset(): void {
    this.searchForm.reset();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
