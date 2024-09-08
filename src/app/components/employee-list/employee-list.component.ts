import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employeeService = inject(EmployeeService);
  displayedColumns: string[] = ['name', 'position', 'department', 'actions'];

  @Output() editRequested = new EventEmitter<Employee>();

  editEmployee(employee: Employee) {
    // Implement edit functionality
    this.editRequested.emit(employee);  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

}
