import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CsvTableService } from 'src/app/csv-table.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  json2csvData:any

  json2csvForm = this.fb.group({
    json: ['[{"id": 1, "Name": "teste"}]', Validators.required],
    csv: ''
  });  

  constructor(private fb: FormBuilder, 
    private csvTable: CsvTableService,
    private snackBar: MatSnackBar) {}

  onSubmit(): void {
    this.json2csvData = this.json2csvForm.value

    if(this.isJson(this.json2csvData.json)){

        let data = JSON.parse(this.json2csvData.json);

        let fields:any = []

        if (Array.isArray(data)) {
          console.log(data.length);
          fields = Object.keys(data[0]);
        } else {
          data = Array.from(data);
          console.log(data)
          fields = Object.keys(data[0]);
        }

        fields = Object.keys(data[0]);

        const csvBody = data.map((row:any) => {
          return fields.map((column:any) => {
            return row[column];
          }).join(',');
        });
        
        const csv = fields.join(',') + '\n' + csvBody.join('\n');

        this.json2csvForm.patchValue({
          csv: csv
        });

        this.csvTable.setData(fields,data);
        console.log(this.csvTable.getData())
    }else
      this.showMsg("ERRO: Json Inválido!");

  }

  isJson(txtJson:string): boolean {
    try {
      JSON.parse(txtJson);
    } catch (e) {
      return false;
    }
    return true;
  }

  reset(): void {
    this.json2csvData = '';
    this.json2csvForm.reset();
    this.csvTable.reset();
  }

  copy(element: string): void {

    let text:string = "";

    if(this.json2csvData){
      if(element == "json")
        text = this.json2csvData.json
      else
      text = this.json2csvData.csv
    }
    else
      text = "";

    const elementoTemporario = document.createElement("textarea");
    elementoTemporario.value = text;
    document.body.appendChild(elementoTemporario);
    elementoTemporario.select();
    document.execCommand("copy");
    document.body.removeChild(elementoTemporario);
  }

  showMsg(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-success']
    })
  }
}
