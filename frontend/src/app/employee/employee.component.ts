import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { AddEmployee, DeleteEmployee, GetEmployee, UpdateEmployee } from '../store/actions/employee.action';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  empForm : FormGroup;
  showModal:boolean = false;
  editMode:boolean = false;

  //employees: Employee[];
  selectedEmployee: Employee;

  @Select(EmployeeState.getEmployeeList) employee$:Observable<Employee[]>
  @Select(EmployeeState.employeeLoaded) employeeLoaded$:Observable<boolean>
  constructor(
    private fb: FormBuilder,
    private _empService:EmployeeService,
    private store:Store 
    ) { }

  ngOnInit(): void {
    this.getEmployees();
    //this.store.dispatch(new GetEmployee());
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Alex Johnson', Validators.required],
      position: ['Full Stack Developer', Validators.required],
      // office: ['United States', Validators.required],
      // salary: [200000, Validators.required]
    })
  }

  getEmployees(){
    this.employeeLoaded$.subscribe(res=>{
      if(!res){
        this.store.dispatch(new GetEmployee());
      }
    })
  }

  onEmpSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
      
      if(this.editMode){
        this.store.dispatch(new UpdateEmployee(this.empForm.value))
        // this._empService.putEmployee(this.empForm.value).subscribe(
        //   (res) => {
        //     console.log('Updated successfully');
        //     this.getEmployees();
        //     this.editMode = false;
        //   },
        //   (err) => {
        //     console.log(err);
        //   },
        // );
      }else{
        this.store.dispatch(new AddEmployee(this.empForm.value))
        // this._empService.postEmployee(this.empForm.value).subscribe(
        //   (res) => {
        //     console.log('Saved successfully');
        //     this.getEmployees();
        //   },
        //   (err) => {
        //     console.log(err);
        //   },
        // );
      }
       
      this.empForm.reset();
      this.onCloseModal();

    }else{

      let key = Object.keys(this.empForm.controls);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.empForm.controls[data];
        // console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
  }

  onEditEmployee(emp:Employee){
    this.editMode = true;

    console.log(emp);
    this.showModal = true;
    this.selectedEmployee = emp;
    console.log(this.selectedEmployee);
    this.empForm.patchValue(this.selectedEmployee);
  }

  onDeleteEmployee(id){
    if(confirm('Do you want to delete this employee?')){
      this.store.dispatch(new DeleteEmployee(id));
      // console.log(id);
      // this._empService.deleteEmployee(id).subscribe(
      //   (res) => {
      //     console.log('Delete successfully');
      //     this.getEmployees();
      //   },
      //   (err) => {
      //     console.log(err);
      //   },
      // );
    }
  }

  onAddEmployee(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
  }

}
