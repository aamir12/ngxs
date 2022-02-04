import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoadDataComponent } from './load-data/load-data.component';

const routes: Routes = [
  {
    path:'infiniteScroll',
    component:LoadDataComponent,
  },
  {
    path:'emplyoee',
    component:EmployeeComponent,
  },
  {
    path:'emplyoee-detail/:id',
    component:EmployeeDetailComponent,
  },
  { path: '',   
    redirectTo: '/emplyoee', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
