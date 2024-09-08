import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from './interfaces/employee';
import { EmployeeService } from './services/employee.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, EmployeeListComponent, EmployeeFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular18-crud';
  employeeService=inject(EmployeeService)
  showForm = signal(false);
  selectedEmployee = signal<Employee | null>(null);

  onFormSubmitted() {
    console.log('Form submitted');
    this.showForm.set(false);
    this.selectedEmployee.set(null);
    this.employeeService.logEmployees();
  }

  onCancelForm() {
    this.showForm.set(false);
    this.selectedEmployee.set(null);
  }

  onEditRequested(employee: Employee) {
    console.log('Edit requested for employee:', employee);
    this.selectedEmployee.set(employee);
    this.showForm.set(true);
  }
}
