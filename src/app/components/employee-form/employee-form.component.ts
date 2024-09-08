import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit  {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  @Input() employee: Employee | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  @Output() employeeAdded = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();

  employeeForm = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    position: ['', Validators.required],
    department: ['', Validators.required]
  });
  get editMode(): boolean {
    return !!this.employee;
  }
  ngOnInit() {
    if (this.employee) {
      console.log('Editing employee:', this.employee);
      this.employeeForm.patchValue(this.employee);
    }
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      console.log('Form submitted with data:', formValue);
      
      if (this.editMode && this.employee) {
        console.log('Updating employee');
        const updatedEmployee: Employee = {
          id: this.employee.id,
          name: formValue.name!,
          position: formValue.position!,
          department: formValue.department!
        };
        this.employeeService.updateEmployee(updatedEmployee);
      } else {
        console.log('Adding new employee');
        const newEmployee: Omit<Employee, 'id'> = {
          name: formValue.name!,
          position: formValue.position!,
          department: formValue.department!
        };
        this.employeeService.addEmployee(newEmployee);
      }
      
      this.employeeForm.reset();
      this.formSubmitted.emit();
    }
  }
  onCancel() {
    this.employeeForm.reset();
    this.cancelForm.emit();
  }
}
