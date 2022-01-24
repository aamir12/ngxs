import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/shared/employee.model";
import { EmployeeService } from "src/app/shared/employee.service";
import { GetEmployee } from "../actions/employee.action";
import {tap} from 'rxjs/operators';

class EmployeeStateModel{
    employees:Employee[];
    isEmployeeLoaded:boolean;
}

//state
@State<EmployeeStateModel>({
    name:'employees',
    defaults:{
        employees:[],
        isEmployeeLoaded:false
    }
})

@Injectable()
export class EmployeeState{

   constructor(private empService:EmployeeService){}  
  //selector has logic to get state data
    //Get employee list from state
    @Selector()
    static getEmployeeList(state:EmployeeStateModel){
        return state.employees;
    }

    @Selector()
    static employeeLoaded(state:EmployeeStateModel){
        return state.isEmployeeLoaded;
    }

    @Action(GetEmployee)
    getEmployees({getState,setState}:StateContext<EmployeeStateModel>){
        return this.empService.getEmployeeList().pipe(
            tap(res=>{
                const state = getState();
                setState({
                    ...state,
                    employees:res,
                    isEmployeeLoaded:true
                })
            })
        )
    }

}


// this._empService.getEmployeeList().subscribe(
// (res) => {
//     console.log(res);
//     this.employees = res as Employee[];
// },
// (err) => {
//     console.log(err);
// }
// )