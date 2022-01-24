import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit,OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private employeeService:EmployeeService
    ) { }

  employeeId:string;
  employee$:Observable<any>;
  paramSub:Subscription;
  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params:Params)=>{
        console.log(params);
        this.employeeId = params['id'];
        this.fetchEmployee();
    })
  }

  fetchEmployee(){
    this.employee$ = this.employeeService.getEmployee(this.employeeId);
  }

  ngOnDestroy() {
      if(this.paramSub){
        this.paramSub.unsubscribe();
      }
  }

}
