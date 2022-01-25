import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/shared/employee.model";
import { EmployeeService } from "src/app/shared/employee.service";
import { AddEmployee, DeleteEmployee, GetEmployee, SetSelectedEmployee } from "../actions/employee.action";
import {tap} from 'rxjs/operators';

class EmployeeStateModel{
    employees:Employee[];
    isEmployeeLoaded:boolean;
    selectedEmployee:Employee;
}

//state
@State<EmployeeStateModel>({
    name:'employees',
    defaults:{
        employees:[],
        isEmployeeLoaded:false,
        selectedEmployee:null
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
    static selectedEmployee(state:EmployeeStateModel){
        return state.selectedEmployee;
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

    @Action(SetSelectedEmployee)
    setSelectedEmployee({getState,setState}:StateContext<EmployeeStateModel>,{id}:SetSelectedEmployee){
        const state = getState();
        const employeeList = state.employees;
        const isExistIndex = employeeList.findIndex(emp=> emp._id === id);
        if(isExistIndex !== -1){
            setState({
                ...state,
                selectedEmployee:employeeList[isExistIndex]
            })
        }else{
            return this.empService.getEmployee(id).pipe(tap((res:any)=>{
                setState({
                    ...state,
                    employees:[res],
                    selectedEmployee:res
                })
            }))
        }
    }

    @Action(AddEmployee)
    addEmployee({getState,patchState}:StateContext<EmployeeStateModel>,{payload}:AddEmployee){
       console.log(payload);
       this.empService.postEmployee(payload).subscribe((res:any) =>{
           const state = getState();
            patchState({
                employees:[...state.employees,res]
            })
       })
    }

    @Action(DeleteEmployee)
    deleteEmployee({getState,patchState}:StateContext<EmployeeStateModel>,{id}:DeleteEmployee){
        return this.empService.deleteEmployee(id).pipe(tap((res:Employee) =>{
            const state = getState();
            const empList = state.employees.filter(emp=> emp._id !== id);
            patchState({
                employees : empList
            })
        }))
    }
}


