import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvTableService {

  header:any = [];
  data: any = [];

  constructor() {}

  setData(header:any, data: any) {
    this.header = header;
    this.data = data;
  }
  
  reset(){
    this.header = [];
    this.data = [];
  }

  getData(): any {
    return this.data;
  }

  getHeader(): any {
    return this.header;
  }

}
