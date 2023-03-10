import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [{
  path: "",
  component: FormComponent
},
{
  path: "table",
  component: TableComponent
},
{
  path: "about",
  component: AboutComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
