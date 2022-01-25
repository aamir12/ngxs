import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { interval, Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { SetSelectedEmployee } from 'src/app/store/actions/employee.action';
import { EmployeeState } from 'src/app/store/state/employee.state';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit,OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private employeeService:EmployeeService,
    private store:Store
    ) { }

  employeeId:string;
  employee:any;
  paramSub:Subscription;
  empSub:Subscription;
  @Select(EmployeeState.selectedEmployee) selectedEmployee:Observable<Employee>
  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params:Params)=>{
        console.log(params);
        this.employeeId = params['id'];
        this.fetchEmployee();
    })
  }

  fetchEmployee(){
    this.store.dispatch(new SetSelectedEmployee(this.employeeId))
    //this.employee$ = this.employeeService.getEmployee(this.employeeId);
    this.empSub = this.selectedEmployee.subscribe(res=>{
       this.employee = res;
    })
  }

  ngOnDestroy() {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
    if(this.empSub){
      this.empSub.unsubscribe();
    }
  }

}
