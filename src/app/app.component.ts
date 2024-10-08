import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { employeeModel } from './model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD_operations';

  formdata: any;


  employeeForm: FormGroup = new FormGroup({});
  employeeList: employeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('empData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
      console.log(this.employeeList);
      console.log(this.employeeList.length);

    }
  }

  employeeObj: employeeModel = new employeeModel;

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      empName: new FormControl(this.employeeObj.empName),
      empContact: new FormControl(this.employeeObj.empContact),
      empEmail: new FormControl(this.employeeObj.empEmail),
      empAddress: new FormControl(this.employeeObj.empAddress),
      empCity: new FormControl(this.employeeObj.empCity),
      empState: new FormControl(this.employeeObj.empState),
      empPincode: new FormControl(this.employeeObj.empPincode),
    })
  }


  onSave() {
    // this.formdata = this.employeeForm;
    // localStorage.setItem("empData", JSON.stringify(this.employeeForm.value))
    // console.log(this.formdata.value);

    const oldData = localStorage.getItem("empData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue((parseData.length) + 1);
      this.employeeList.unshift(this.employeeForm.value)
      // localStorage.setItem("empData", JSON.stringify(this.employeeForm.value));
    }
    else {
      // this.employeeForm.controls['empId'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value)
    }

    localStorage.setItem("empData", JSON.stringify(this.employeeList));
    this.employeeObj = new employeeModel();
    this.createForm();
    // this.employeeForm.reset();

  }

  


  onReset() {
    this.employeeObj = new employeeModel();
    this.createForm();
  }

  onEdit(item: employeeModel) {
    this.employeeObj = item;
    this.createForm();

  }

  onUpdate() {
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if (record != undefined) {
      record.empName = this.employeeForm.controls['empName'].value;
      record.empEmail = this.employeeForm.controls['empEmail'].value;
      record.empContact = this.employeeForm.controls['empContact'].value;
    }

    localStorage.setItem('empData', JSON.stringify(this.employeeList));
    this.employeeObj = new employeeModel();
    this.createForm();

  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete");

    if(isDelete) {
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem('empData', JSON.stringify(this.employeeList));

    }
  }


  deleteAllData() {
    localStorage.clear();
    this.employeeList = [];
  }


}
